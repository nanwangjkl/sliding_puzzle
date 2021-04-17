import Constants from './constants'

const __ = {
  x: Symbol('x'),
  y: Symbol('y')
}
const SWIPEGAP = 40

export default function (
  target = {},
  onSwipe = function () {}
) {
  let swipeStart = ev => {
    target[__.x] = ev.data.global.x
    target[__.y] = ev.data.global.y
  }
  let swipeEnd = ev => {

    let deltaX = ev.data.global.x - target[__.x]
    let deltaY = ev.data.global.y - target[__.y]

    if (deltaX * deltaX + deltaY * deltaY >= SWIPEGAP * SWIPEGAP) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          onSwipe(Constants.RIGHT)
        } else {
          onSwipe(Constants.LEFT)
        }
      } else {
        if (deltaY > 0) {
          onSwipe(Constants.DOWN)
        } else {
          onSwipe(Constants.UP)
        }
      }
    }
  }
  target.interactive = true
  target.on('pointerdown', swipeStart).on('pointerup', swipeEnd).on('pointerupoutside', swipeEnd)
}