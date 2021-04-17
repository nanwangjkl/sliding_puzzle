import * as PIXI from 'pixi.js'
import {
  Constants
} from '../utils'

class Hint extends PIXI.Container {
  constructor(resourece = 'puzzle-easy.jpg') {
    super()
    this.image = new PIXI.Sprite.from(resourece)
    this.addChild(this.image);

    this.wrapper = new PIXI.Sprite.from('wrap.png')
    this.wrapper.width = this.image.width
    this.wrapper.height = this.image.height
    this.addChild(this.wrapper);
  }
}
export default Hint