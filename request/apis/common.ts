import $axios from '~/request/core/request'

/**
 * 公共配置信息
 **/
export function getAppConfig () {
    const path:string = '/api/config/getCommonConfig'
    return $axios.post(path, {}, { alertError: false, cacheTime: 3600000, loading: true })
}
