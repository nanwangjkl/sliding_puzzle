import * as PIXI from 'pixi.js'
import {
  Constants
} from '../utils'
import BezierEasing from 'bezier-easing'

const ANI_SPEED = 0.1
const easeInOut = BezierEasing(0.42, 0, 0.58, 1)

class Piece extends PIXI.Container {
  constructor(resourece = 'puzzle-easy.jpg', type = Constants.EASY, index = 0, position = 0) {
    super()

    let texture = PIXI.Texture.from(resourece).clone()

    // 重构frame，将图片按照难度和序号切割成小块
    let cutX = texture.frame.width / type
    let cutY = texture.frame.height / type
    let rectangle = new PIXI.Rectangle(
      texture.frame.x + (index % type) * cutX,
      texture.frame.y + Math.floor(index / type) * cutY,
      texture.frame.height / type,
      texture.frame.width / type)
    texture.frame = rectangle

    let piece = new PIXI.Sprite(texture)
    this.addChild(piece);

    // 添加拼图块的边框
    let wrapper = PIXI.Sprite.from('wrap.png')
    wrapper.width = piece.width
    wrapper.height = piece.height
    this.addChild(wrapper);

    this.pieceType = type
    this.pieceIndex = index
    this.piecePosition = position
    this.x = (this.piecePosition % this.pieceType) * this.width
    this.y = Math.floor(this.piecePosition / this.pieceType) * this.height
    this.targetX = this.x
    this.targetY = this.y
    // 这个数字表示动画是否完成
    // 0表示刚刚开始
    // 1表示已经结束
    this.ani = 1
  }

  setPosition(position) {
    if (this.ani < 1) {
      return
    }
    this.ani = 0
    this.piecePosition = position
    this.originX = this.x
    this.originY = this.y
    this.targetX = (position % this.pieceType) * this.width
    this.targetY = Math.floor(position / this.pieceType) * this.height
  }

  update() {
    this.ani += ANI_SPEED
    if (this.ani >= 1) {
      this.ani = 1
      this.x = this.targetX
      this.y = this.targetY
      return
    }
    this.x = this.originX + (this.targetX - this.originX) * easeInOut(this.ani)
    this.y = this.originY + (this.targetY - this.originY) * easeInOut(this.ani)
  }
}



export default Piece