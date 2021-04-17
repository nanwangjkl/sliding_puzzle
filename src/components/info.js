import * as PIXI from 'pixi.js'
import {
  Constants
} from '../utils'

const BANNER_RATIO = 0.2

class Info extends PIXI.Container {
  constructor(resourece = 'puzzle-easy.jpg') {
    super()
    this.image = new PIXI.Sprite.from(resourece)
    this.addChild(this.image);

    this.banner = new PIXI.Graphics();
    this.banner.beginFill(0x000000, 0.6);
    this.banner.drawRect(0, 0, this.image.width, this.image.width * BANNER_RATIO);
    this.banner.endFill();
    this.addChild(this.banner);

    let style = new PIXI.TextStyle({
      fontSize: this.image.width * BANNER_RATIO * 0.3,
      fill: "white"
    });
    this.message = new PIXI.Text("恭喜！您完成了拼图", style);
    this.message.y = this.banner.height / 2 - this.message.height / 2
    this.message.x = this.message.y
    this.addChild(this.message);
  }

  setText(text = '') {
    this.message.text = text
  }
}
export default Info