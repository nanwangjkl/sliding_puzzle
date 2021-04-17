import config from '../config'

const {
  pixelRatio,
  windowHeight,
  windowWidth
} = wx.getSystemInfoSync(),
  context = canvas.getContext('webgl', {
    stencil: true
  })

//有一次微信更新突然挂了：https://developers.weixin.qq.com/community/develop/doc/000c46c5fc0348b70167e46fb56800?jumpto=comment&commentid=0008c219e64320732e671c1705b8

PIXI.utils.isWebGLSupported = () => {
  return context
}

PIXI.interaction.InteractionManager.prototype.mapPositionToPoint = (point, x, y) => {
  point.x = x * pixelRatio
  point.y = y * pixelRatio
}


config.screen.width = windowWidth
config.screen.height = windowHeight
config.screen.resolution = pixelRatio

const app = new PIXI.Application({
  context,
  view: canvas,
  width: windowWidth * pixelRatio,
  height: windowHeight * pixelRatio,
  backgroundColor: config.bkgColor,
  antialias: true,
  sharedLoader: true
})

// 设置节点相对屏幕中心的偏移
app.translate = (node, x = 0, y = 0) => {
  const rect = node.getBounds(false)
  node.position.set(
    (app.screen.width + rect.width) * .5 - rect.right + x,
    (app.screen.height + rect.height) * .5 - rect.bottom + y
  )
}

app.gl = context


export default app
export const monitor = new PIXI.utils.EventEmitter()