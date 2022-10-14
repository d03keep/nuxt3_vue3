/**
 * 判断浏览器是否支持webp格式图片
 */
export const checkWebp = (): boolean => {
    try {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (err) {
        return false
    }
}

/**
 * URL参数 转对象
 */
export const getUrlParameters = (url = window.location.href) => {
    const arr = url.match(/([^?=&]+)(=([^&]*))/g) || []
    return arr.reduce((a:any, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {})
}
/**
 * 对象转URL参数
 */
export const toQueryUrl = (path: string = '', query: any = {}) => {
    const arr: any[] = []
    for (const key in query) {
        const val: any = query[key] || ''
        arr.push(`${key}=${val}`)
    }
    const queryUrl: string = arr.join('&')
    return path.indexOf('?') > -1 ? (path + queryUrl) : queryUrl ? `${path}?${queryUrl}` : path
}


/**
 * 日期格式化
 * date--> 可以是 时间戳 和 标准的日期格式
 * fmt 年月日时分秒 --> 'yyyy-MM-dd hh:mm:ss'
 * ex --> format(new Date(), 'yyyy-MM-dd hh:mm:ss')
 * -----> 2022-03-04 17:21:02
 */
export function formatDate (date:Date|number, fmt:string = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date)
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            // @ts-ignore
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

/**
 *  千位分隔符
 *  formatMoney('1393933', 3, ',') ==> 1,393,933
 */
export function formatMoney (str:string|number = '', size = 3, delimiter = ',') {
    if (Number.isNaN(str)) return '0.00'
    const _str:string = str.toString()
    /*
      如果_size是3
      reg = /\d{1,3}(?=(\d{3})+$)/g
      匹配连续的三个数字，但是这些三个数字不能是字符串的开头1-3个字符
    */
    const reg = new RegExp('\\d{1,' + size + '}(?=(\\d{' + size + '})+$)', 'g')
    /*
      $0: 匹配的结果
      $1: (-?) 匹配前面的-号
      $2:(\d+)匹配中间的数字
      $3: ((\.\d+)?)匹配小数点后面的数字
    */
    return _str.replace(/^(-?)(\d+)((\.\d+)?)$/, ($0, $1, $2, $3) => ($1 + $2.replace(reg, '$&' + delimiter) + $3))
}

// 获取数据类型
export function getDataType (data: any): string {
    return (Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[])[1]
}

// count 1 7 30
export function getDayRange(count: number) {
    const dd: Date = new Date()
    const ed: Date = new Date()
    dd.setDate(dd.getDate() + 1)
    let y: number = dd.getFullYear()
    let m: number = dd.getMonth() + 1
    let d: number = dd.getDate()
    const endDate: Date = new Date(`${y}-${m}-${d}`)
    ed.setDate(ed.getDate() + count)
    y = ed.getFullYear()
    m = ed.getMonth() + 1
    d = ed.getDate()
    const startDate: Date = new Date(`${y}-${m}-${d}`)
    return {
        startDate,
        endDate
    }
}

export function formatCurrency(num: any) {
    num = String(num).replace(/\$|\,/g, '')
    if (isNaN(num)) {
        num = '0'
    }
    const sign: any = (num === (num = Math.abs(num)))
    num = Math.floor(num * 100 + 0.50000000001)
    let cents: any = num % 100
    num = Math.floor(num / 100).toString()
    if (cents < 10) {
        cents = '0' + cents
    }
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
    }
    return (((sign) ? '' : '-') + num + '.' + cents)
}

/**
 * 数字保留小数点位数
 * n 要处理的数字
 * size 保留小数点位数
 * */
export function fixedNumber(n:number, size:number = 2):number {
    // if (isNaN(n) || isNaN(size)) throw Error(`参数n:${n}，必须为数字!`)
    if (isNaN(n) || isNaN(size)) return 0
    const _n:string = n.toString()
    const arr:string[] = _n.split('.')
    if (arr[1]) {
        arr[1] = arr[1].substring(0, size)
    }
    return Number(arr.join('.'))
}

export function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

/**
 * @description: 复制功能
 * @param {*} val
 * @return {*}
 */
export function copy(val: string): void {
    const input = document.createElement('input');
    input.value = val;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
}

/**
 * @description: 判断设备类型
 */
export function judgeClient() {
    let client = ''
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
        client = 'iOS'
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        client = 'Android'
    } else {
        client = 'PC'
    }
    return client
}
/**
 * 日期格式化为类似“新浪微博发表时间”
 */
export function getTimes( timestamp:number ) {
    function zeroize( num:number ) {
        return (String(num).length == 1 ? '0' : '') + num;
    }
    const curTimestamp = Math.floor(Date.now() / 1000);
    const timestampDiff = curTimestamp - timestamp;
    const curDate = new Date( curTimestamp * 1000 );
    const tmDate = new Date( timestamp * 1000 );
    const Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    const H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
    if ( timestampDiff < 60 ) {
        return "刚刚";
    } else if( timestampDiff < ( 60 * 60 ) ) {
        return Math.floor( timestampDiff / 60 ) + "分钟前";
    } else if ( timestampDiff < ( 60 * 60 * 24 ) ) {
        return Math.floor( timestampDiff / ( 60 * 60 ) ) + "小时前";
    } else if ( timestampDiff < ( 60 * 60 * 24 * 30 ) ) {
        return Math.floor( timestampDiff / ( 60 * 60 * 24 ) ) + "天前";
    } else {
        if ( curDate.getFullYear() == Y ) {
            return  zeroize(m) + '-' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
        } else {
            return  Y + '-' + zeroize(m) + '-' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
        }
    }
}
