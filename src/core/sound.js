import config from '../config'

const bgm = {
  i: 0,
  queue: [],

  start() {
    const next = () => {
      this.i === 2 ? this.i = 0 : this.i++
      this.queue[this.i].play()
    }

    this.queue = Array.from({length: 3}).map((item, i) => {
      const bgm = wx.createInnerAudioContext()
      bgm.src = `${config.cdn}/static/sounds/bgm.${i + 1}.mp3`
      bgm.autoplay = false
      bgm.onEnded(next)
      return bgm
    })

    wx.onShow(next)
  }
}

export default {
  bgm
}