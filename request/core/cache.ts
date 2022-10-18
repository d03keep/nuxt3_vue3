/**
 * 数据缓存
 * library
 **/
interface IData {
  cacheTime: number;
  path: string;
  data: any
}

export interface IResult {
  code: number;
  data: any;
}

class HttpCache {
  private readonly capacity: number;
  private map: Map<string, IData>;

  constructor (capacity: number = 100) {
    // 存储最大数量
    this.capacity = capacity

    // store
    this.map = new Map()
  }

  get (key: string, time: number) {
    const val = this.map.get(key)
    // 未命中
    if (typeof val === 'undefined') {
      return { code: -1, data: null }
    }

    // 缓存过期(缓存时长 大于当前 key 的指定缓存时长)
    if (Date.now() - val.cacheTime > time) {
      this.map.delete(key)
      return { code: 0, data: null }
    }

    return { code: 1, data: val.data }
  }

  put (key:string, value: any) {
    if (this.map.has(key)) {
      this.map.delete(key)
    }

    this.map.set(key, value)
    const keys = this.map.keys()
    while (this.map.size > this.capacity) { this.map.delete(keys.next().value) }
  }

  clear () {
    this.map.clear()
  }

  static createKey (path:string, params: any) {
    const arr:any = []
    for (const key in params) arr.push(`${key}=${params[key]}`)
    return arr.length ? `${path}?${arr.join('&')}` : path
  }
}

export default HttpCache
