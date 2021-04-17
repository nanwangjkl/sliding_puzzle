import * as PIXI from 'pixi.js'
import core from '../core'
import {
  Constants
} from '../utils'

const HELP_RATIO = 0.9

class Help extends PIXI.Container {
  constructor() {
    super()
    const {width, height} = core.screen

    this.mask2 = new PIXI.Graphics();
    this.mask2.beginFill(0x000000, 0.6);
    this.mask2.drawRect(0, 0, width, height);
    this.mask2.endFill();
    this.addChild(this.mask2);

    this.image = new PIXI.Sprite.from('puzzle-help.png')
    this.image.scale.set((this.mask2.width * HELP_RATIO) / this.image.width)
    this.image.x = this.mask2.width / 2 - this.image.width / 2
    this.image.y = this.mask2.height / 2 - this.image.height / 2
    this.addChild(this.image);
  }
}
export default Help