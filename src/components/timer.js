import * as PIXI from 'pixi.js'
import {
  Constants
} from '../utils'

const TIMER_RATIO = 0.6

class Info extends PIXI.Container {
  constructor() {
    super()
    this.timer_bg = PIXI.Sprite.from('time_bg.png');
    this.addChild(this.timer_bg)

    let style = new PIXI.TextStyle({
      fontSize: this.timer_bg.height * TIMER_RATIO,
      fill: "white"
    });
    this.timer_string = new PIXI.Text('00:00', style);
    this.timer_string.y = this.timer_bg.height / 2 - this.timer_string.height / 2
    this.timer_string.x = this.timer_bg.width / 2 - this.timer_string.width / 2
    this.addChild(this.timer_string);
  }
  setTime(currentTime) {
    let timeS = currentTime / 1000;
    let minute = Math.floor(timeS / 60)
    if (minute < 10) {
      minute = '0' + minute
    }
    let second = Math.floor(timeS % 60)
    if (second < 10) {
      second = '0' + second
    }
    this.timer_string.text = minute + ':' + second
  }
  getText() {
    return this.timer_string.text
  }
}
export default Info