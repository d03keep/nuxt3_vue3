import { fixedNumber } from './common'

const rem = () => {
  const { innerWidth, document } = globalThis
  // 最大200px 最小50 1920宽度设计稿
  const fontSize = fixedNumber(Math.min(Math.max(innerWidth, 750), 1920) / 1920 * 100 )
  document.documentElement.style.fontSize = fontSize + 'px'
}

export function initialHtmlStyle () {
  const { document } = globalThis
  if (process.client) {
    rem()

    globalThis.rem2px = (r:string):number => {
      const fontSize = Number.parseFloat(document.documentElement.style.fontSize)
      return Number.parseFloat(r) * fontSize
    }

    globalThis.px2rem = (f:string):number => {
      const fontSize = Number.parseFloat(document.documentElement.style.fontSize)
      return Number.parseFloat(f) / fontSize
    }

    // 禁止缩放
    document.addEventListener('gesturestart', (event) => { event.preventDefault() })

    // 禁止双指放大
    let lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    // 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
    // 禁止双指放大
    document.documentElement.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, false);

    globalThis.addEventListener('resize', rem)
  }
}
