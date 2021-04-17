import { Functions } from '../utils'

const rect = new PIXI.Rectangle()

let delta

export default class Layout extends PIXI.Container {
  static VERTICAL = 1
  static HORIZONTAL = 0

  constructor(option = {}) {
    super()
    this.type = option.type || Layout.VERTICAL
    this.gap = Functions.getValue(option.gap, 10)
    this.listen()
  }

  listen() {
    this.on('added', () => {
      this.place()
    })
  }

  destroy() {
    super.destroy()
  }

  addChild(...args) {
    super.addChild(...args)
  }

  place() {
    this.children.forEach((child, i) => {
      this.type ? this._placeVertical(child, i) :
        this._placeHorizontal(child, i)
    })
    this.emit('resize', this.getLocalBounds(rect))
  }

  _placeHorizontal(child, i) {
    /* getLocalBounds 替代 */
    // const ox = child.pivot.x ?
    //   child.pivot.x / child.width :
    //   child.anchor ? child.anchor.x : 0
    child.getLocalBounds(rect)
    const ox = -rect.x / rect.width
    i ? child.x = this.gap + delta + ox * child.width : child.x = ox * child.width
    delta = child.x + (1 - ox) * child.width
  }

  _placeVertical(child, i) {
    /* getLocalBounds 替代 */
    // const oy = child.pivot.y ?
    //   child.pivot.y / child.height :
    //   child.anchor ? child.anchor.y : 0
    child.getLocalBounds(rect)
    const oy = -rect.y / rect.height
    i ? child.y = this.gap + delta + oy * child.height : child.y = oy * child.height
    delta = child.y + (1 - oy) * child.height
  }

  onChildrenChange(count) {
    if (this.graphics && this.graphics !== this.children[count]) {
      this.addChildAt(this.graphics, count)
    }
  }

  drawFrame() {
    // this.getLocalBounds(rect)
    // this.graphics = this.graphics || new PIXI.Graphics()
    // this.graphics.clear()
    // this.graphics.lineStyle(1, 0xff0000, 1)
    // this.graphics.drawRect(0, 0, rect.width, rect.height)
    // this.graphics.endFill()
    // !this.graphics.parent && this.addChild(this.graphics)
  }
}