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
  data: IData | null;
}

class HttpCache {
  private readonly capacity: number;
  private store: Map<string, IData>;

  constructor (capacity: number = 100) {
    // 存储最大数量
    this.capacity = capacity

    // store
    this.store = new Map()
  }

  get (key: string, time: number): IResult {
    const val = this.store.get(key)
    // 未命中
    if (typeof val === 'undefined') {
      return { code: -1, data: null }
    }

    // 缓存过期(缓存时长 大于当前 key 的指定缓存时长)
    if (Date.now() - val.cacheTime > time) {
      this.store.delete(key)
      return { code: 0, data: null }
    }

    return { code: 1, data: val.data }
  }

  put (key:string, value: any) {
    if (this.store.has(key)) {
      this.store.delete(key)
    }

    this.store.set(key, value)
    const keys = this.store.keys()
    while (this.store.size > this.capacity) {
      this.store.delete(keys.next().value)
    }
  }

  clear () {
    this.store.clear()
  }

  static createKey (path:string, params: any) {
    const arr:any = []
    for (const key in params) arr.push(`${key}=${params[key]}`)
    return arr.length ? `${path}?${arr.join('&')}` : path
  }
}

export default HttpCache
