import axios, {AxiosRequestConfig, AxiosResponse, AxiosTransformer, Method} from "axios";
import { useUserStore } from '~/store/useUserStore'
import HttpCache, { IResult } from './cache'
import { toQueryUrl } from '@/utils/common'
import mitt from '@/event/mitt'
import { getDeviceNo } from "@/utils/device";

// 存放所有api loading 状态
const loadingStatus:{[propName: string]: boolean} = {};

interface requestOptions {
    baseUrl: string;
    readonly path: string;
    params: any;
    loading: boolean;
    alertError: boolean;
    timeout: number;
    cacheTime: number;
    headers: any;
    responseType: XMLHttpRequestResponseType;
    pf: number;
    auth: number;
    method: 'POST' | 'GET' | 'DELETE'
}

type httpOptions = {
    baseUrl?: string;
    loading?: boolean;
    alertError?: boolean;
    timeout?: number;
    cacheTime?: number;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    pf?: number;
    auth?: number;
}

/**
 * 默认请求配置
 * @baseUrl 基础路径
 * @path api路由
 * @params 参数,get post 都是 {}
 * @loading 请求时是否显示全局遮罩 loading
 * @alertError 请求报错是否弹框显示错误信息
 * @cacheTime 接口返回数据缓存时间 当 <= 0 时不缓存
 * @timeout 响应超时时间
 * @responseType 返回数据类型
 * @headers 请求头
 * @pf 是否 开启protobuf 0 不开启 1 开启
 * @auth < 0 不拦截接口的用户权限 0 弹框提示登录 1 强制跳转登录
 * */
const defaultRequestOptions: requestOptions = {
    baseUrl: __ENV__ === 'dev' ? '/proxy' : __API_URL__,
    // baseUrl: __API_URL__,
    path: '',
    params: {},
    loading: false,
    alertError: true,
    cacheTime: 1000,
    timeout: 20000,
    responseType: 'text',
    pf: 1,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    auth: 1,
    method: 'GET'
}

// 数据缓存上线100条
const httpStore = new HttpCache(100)


//创建axios对象
const request = async (requestOptions:requestOptions) => {
    const { path, params, timeout, cacheTime } = requestOptions
    const device = process.client ? await getDeviceNo() : ''
    const user = useUserStore()

    const httpCacheKey: string = HttpCache.createKey(path as string, params)
    const result: IResult = httpStore.get(httpCacheKey, cacheTime as number)

    // 如果缓存未过期 返回缓存数据
    if (result.code === 1) return Promise.resolve(result.data??{})

    // 基本配置
    const $axios = axios.create({
        baseURL: requestOptions.baseUrl,
        timeout: timeout ?? defaultRequestOptions.timeout,
        transformRequest: [function (data, headers) {
            // 对发送的 data 进行任意转换处理
            return data;
        }],
        transformResponse: [function (data) {
            // 对接收的 data 进行任意转换处理
            return data;
        }]
    })

    // 添加请求拦截器
    $axios.interceptors.request.use(
        (config:AxiosRequestConfig) => handleBeforeRequest(config, requestOptions),
        async (error) => await handleAfterRequest(requestOptions, error.response)
    );

    // 添加响应拦截器
    $axios.interceptors.response.use(
        async (response:AxiosResponse) => await handleAfterRequest(requestOptions, response),
        async (error) => await handleAfterRequest(requestOptions, error.response)
    );

    return $axios.request({
        url: path,
        method: requestOptions.method,
        headers: {
            ...requestOptions.headers,
            d: device,
            t: user.token,
            p: '1' // 1.pc 2.h5 3.admin
        },
        params: requestOptions.method.toLocaleUpperCase() === 'POST' ? params : null,
        data: requestOptions.method.toLocaleUpperCase() === 'GET' ? params : null,
    })
}

// 请求前
async function handleBeforeRequest(config:AxiosRequestConfig, options: requestOptions) {
    // 在发送请求之前
    const { loading } = options

    if (loading) {
        mitt.emit('loading', true)
        loadingStatus[`${options.path}`] = true
    }

    return config
}

// 请求后
function handleAfterRequest(options: requestOptions, response?: AxiosResponse) {
    const { path, params, cacheTime, alertError, loading } = options
    const status = response?.status || -1
    const res = JSON.parse(response?.data ?? '{}')

    console.log('\n======API result start=====')
    console.log('接口:', path)
    console.log('入参:', params)
    console.log('返回:', res)
    console.log('======API result end=========\n')

    // 关闭loading
    if (loading) {
        loadingStatus[path] = false
        // 如果所有loading状态都为false
        mitt.emit('loading', Object.values(loadingStatus).reduce((flag, pre) => flag || pre, false))
    }

    if (status === 200) {
        console.log('handleAfterRequest===>', res)
        // 弹报错信息
        if (res.status !== 0 && alertError) {
            mitt.emit('toast', {msg: res.msg})
        }

        // 请求成功，并缓存
        if (res.status === 0 && cacheTime > 0) {
            const httpCacheKey: string = HttpCache.createKey(path as string, params)
            httpStore.put(httpCacheKey, {cacheTime: Date.now(), path: httpCacheKey, data: res})
        }

        return Promise.resolve(res)
    } else {
        mitt.emit('toast', {msg: `[${status}]网络异常，请稍后再试`})
    }

    return Promise.resolve({code: status, msg: `[${status}]网络异常，请稍后再试`})
}

function mergeCustomRequestOptions(options: httpOptions = {}): httpOptions {

    return {
        baseUrl: options.baseUrl || defaultRequestOptions.baseUrl,
        loading: options.hasOwnProperty('loading') ? options.loading : defaultRequestOptions.loading,
        alertError: options.hasOwnProperty('alertError') ? options.alertError : defaultRequestOptions.alertError,
        cacheTime: options.cacheTime || defaultRequestOptions.cacheTime,
        timeout: options.timeout || defaultRequestOptions.timeout,
        responseType: options.responseType || defaultRequestOptions.responseType,
        pf: options.pf || defaultRequestOptions.pf,
        headers: {
            ...defaultRequestOptions.headers,
            ...options.headers
        },
        auth: options.auth || defaultRequestOptions.auth
    }
}


export default {
    post(path: string = '', params: any = {}, options: httpOptions) {

        const _options = mergeCustomRequestOptions(options)

        const requestOption: requestOptions = {
            ..._options,
            path,
            params,
            method: 'POST'
        } as requestOptions

        return request(requestOption)
    },

    get(path: string = '', params: any = {}, options: httpOptions) {
        const _options = mergeCustomRequestOptions(options)

        const _path = toQueryUrl(path, params)

        const requestOption: requestOptions = {
            ..._options,
            params: {},
            path: _path,
            method: 'GET'
        } as requestOptions
        return request(requestOption)
    }
}
