
/**
 * 一个Button基础类
 * 
 * @export
 * @class Button
 */
export default class Button {
  constructor(src, x, y, width, height) {
    this.img = new Image()
    this.img.src = src
    this.x = x
    this.y = y
    this.height = height
    this.width = width
  }

  render(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  isTapped(x, y) {
    if (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)) {
      return true
    }
    return false
  }
}