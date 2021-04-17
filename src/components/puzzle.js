import * as PIXI from 'pixi.js'
import {
  Constants,
  gameMap
} from '../utils'
import Piece from './piece'

class Puzzle extends PIXI.Container {
  constructor(resourece = 'puzzle-easy.jpg', type = Constants.EASY) {
    super()

    this.puzzleMap = gameMap(type)
    this.puzzleType = type
    this.emptyPosition = type * type - 1

    for (let i = 0; i < this.puzzleMap.length; i++) {
      let position = this.puzzleMap[i] - 1;
      let piece = new Piece(resourece, type, i, position)
      this.addChild(piece);
    }

    this.gameOn = true
  }

  movePieces(direction) {
    if (!this.gameOn) {
      return
    }

    // 检查是否有动画未完成的情况
    for (const piece of this.children) {
      if (piece.ani < 1) {
        return
      }
    }

    let targetPiece
    switch (direction) {
      case Constants.UP:
        targetPiece = this.emptyPosition + this.puzzleType
        break;
      case Constants.DOWN:
        targetPiece = this.emptyPosition - this.puzzleType
        break;
      case Constants.LEFT:
        targetPiece = this.emptyPosition + 1
        if (Math.floor(targetPiece / this.puzzleType) !== Math.floor(this.emptyPosition / this.puzzleType)) {
          // 如果两个商不相等，说明左右滑动出现了换行现象，不能执行
          return;
        }
        break;
      case Constants.RIGHT:
        targetPiece = this.emptyPosition - 1
        if (Math.floor(targetPiece / this.puzzleType) !== Math.floor(this.emptyPosition / this.puzzleType)) {
          return;
        }
        break;
      default:
        break;
    }
    for (const piece of this.children) {
      if (piece.piecePosition === targetPiece) {
        piece.setPosition(this.emptyPosition)
        this.emptyPosition = targetPiece
        break
      }
    }

    this.gameOn = this.checkGameOn()
  }

  update () {
    for (const piece of this.children) {
      piece.update()
    }
  }
  
  checkGameOn() {
    for (const piece of this.children) {
      if (piece.pieceIndex !== piece.piecePosition) {
        return true
      }
    }
    return false
  }
}



export default Puzzle