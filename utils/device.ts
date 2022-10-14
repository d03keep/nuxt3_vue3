import murmurHash3 from 'murmurhash3js'

// 获取 系统默认字体
export function getFontFamily() {
  const html = document.documentElement
  const computedStyles = window.getComputedStyle(html)
  // @ts-ignore
  return computedStyles['font-family']
}

// 判断系统字体
export function isSupportFontFamily(f = '') {
  if (typeof f !== 'string') {
    return false
  }
  const h = getFontFamily()
  if (f.toLowerCase() === h.toLowerCase()) {
    return true
  }
  const e = 'a'
  const d = 100
  const a = 100
  const i = 100
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const ctx:any = canvas.getContext('2d')
  canvas.width = a
  canvas.height = i
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.textBaseline = 'middle'
  function g(j:string) {
    ctx.clearRect(0, 0, a, i)
    ctx.font = d + 'px ' + j + ', ' + h
    ctx.fillText(e, a / 2, i / 2)
    const k = ctx.getImageData(0, 0, a, i).data
    return [].slice.call(k).filter(function (l) {
      return l !== 0
    })
  }
  return g(h).join('') !== g(f).join('')
}

export function checkSystemFonts() {
  const fontFamily = [
    'Arial',
    'Microsoft YaHei',
    'sans-serif',
    'Tahoma',
    'Helvetica',
    '\\5b8b\\4f53',
    'Hiragino Sans GB',
    'Verdana',
    'Heiti SC',
    'Hiragino KakuGothic',
    'Times New Roman',
    'Helvetica Neue',
    'PingFang SC',
    'San Francisco',
    'Droid Sans',
    'Droid Sans',
    'Droid Sans Fallback',
    'STXihei',
    'WenQuanYi Micro Hei'
  ]

  return fontFamily.filter(font => isSupportFontFamily(font)).join('，')
}

export function getTimeZone() {
  return 'UTC+' + (0 - new Date().getTimezoneOffset() / 60)
}

function resetObj(obj = {}) {
  let str = []
  for (const key in obj) {
    // @ts-ignore
    str.push(`${key}:${obj[key]}`)
  }
  return str.join('&')
}

export function createDeviceNo() {
  const u = navigator.userAgent
  const info = {
    webrtcid: '',
    // vs: getIosVersion(),
    OS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('Intel Mac OS') > -1 ? 'ios' : 'android',
    // iosVersion: getIosVersion(),
    // innerWidth: window.innerWidth,
    // innerHeight: window.innerHeight,
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
    colorDepth: window.screen.colorDepth,
    language: window.navigator.language,
    // netWork: Object.values(navigator.connection).join('-'),
    // browser_version: version,
    // browser_type: type,
    devicePixelRatio: window.devicePixelRatio,
    // fingerprint: getCanvasFingerprint(),
    // userAgent: window.navigator.userAgent,
    zone: getTimeZone(), // 时区
    font: getFontFamily(), // 当前默认字体
    allFonts: checkSystemFonts() // 所有支持的字体
  }

  return new Promise((resolve, reject) => {
    const pc = new RTCPeerConnection({ iceServers: [] })
    if (!pc) {
      // @ts-ignore
      info.webrtcid = Math.random() * 10000000
      resolve(murmurHash3.x86.hash128(resetObj(info), 24))
    }
    pc.createDataChannel('xxx000xxxx') // create a bogus data channel
    pc.createOffer().then(SDP => {
      pc.setLocalDescription(
        SDP,
        () => {},
        () => {}
      )
    })
    pc.onicecandidate = ice => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        info.webrtcid = ice.candidate.candidate.split(' ')[0].split(':')[1]
      }

      resolve(murmurHash3.x86.hash128(resetObj(info), 24))
    }
  })
}

export async function getDeviceNo() {
  let device_no = localStorage.getItem('device')

  if (!device_no) {
    const device:any = await createDeviceNo()

    device_no = device ?? (Date.now() + Math.random() * 1000000).toString() as string

    if (device_no) {
      localStorage.setItem('device', device_no)
    }
  }

  return device_no
}


