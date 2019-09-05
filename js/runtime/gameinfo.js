/* global Image */

import DataBus from '../databus'
import Button from '../base/button'
import Piece from '../models/piece'
import GameMap from '../runtime/gameMap'

let databus = new DataBus()
let gameMap = new GameMap()

const helpButtonPadding = 15

// 拼图图片
const PUZZLE_EASY_SRC = 'images/puzzle-easy.jpg'
const PUZZLE_EASY_WIDTH = 1000
const PUZZLE_EASY_HEIGHT = 1000

const PUZZLE_MIDDLE_SRC = 'images/puzzle-middle.jpg'
const PUZZLE_MIDDLE_WIDTH = 1000
const PUZZLE_MIDDLE_HEIGHT = 1000

const PUZZLE_HARD_SRC = 'images/puzzle-hard.jpg'
const PUZZLE_HARD_WIDTH = 1000
const PUZZLE_HARD_HEIGHT = 1000

// 菜单图片
const IMG_START_SRC = 'images/start.png'
const IMG_START_WIDTH = 800
const IMG_START_HEIGHT = 1000

const IMG_EASY_SRC = 'images/easy.png'
const IMG_EASY_WIDTH = 400
const IMG_EASY_HEIGHT = 200

const IMG_MIDDLE_SRC = 'images/middle.png'
const IMG_MIDDLE_WIDTH = 400
const IMG_MIDDLE_HEIGHT = 200

const IMG_HARD_SRC = 'images/hard.png'
const IMG_HARD_WIDTH = 400
const IMG_HARD_HEIGHT = 200

const IMG_TIME_SRC = 'images/time_bg.png'
const IMG_TIME_WIDTH = 400
const IMG_TIME_HEIGHT = 200

const IMG_HELP_SRC = 'images/help.png'
const IMG_HELP_WIDTH = 300
const IMG_HELP_HEIGHT = 200

const IMG_HELP_CONTENT_SRC = 'images/puzzle-help.png'
const IMG_HELP_CONTENT_WIDTH = '640'
const IMG_HELP_CONTENT_HEIGHT = '907'

const IMG_HINT_SRC = 'images/hint.png'
const IMG_HINT_WIDTH = 300
const IMG_HINT_HEIGHT = 200

const IMG_HINT_CONTENT_SRC = 'images/wrap.png'
const IMG_HINT_CONTENT_WIDTH = 300
const IMG_HINT_CONTENT_HEIGHT = 300

const IMG_REPLAY_SRC = 'images/replay.png'
const IMG_REPLAY_WIDTH = 300
const IMG_REPLAY_HEIGHT = 200

let instance

export default class GameInfo {
  constructor () {
    if (instance) { return instance }
    instance = this

    // 开始菜单背景
    let imgStartRatio = (databus.screenWidth * 0.8) / IMG_START_WIDTH
    this.imgStart = new Button(
      IMG_START_SRC,
      (databus.screenWidth - imgStartRatio * IMG_START_WIDTH) / 2,
      (databus.screenHeight - imgStartRatio * IMG_START_HEIGHT) / 2,
      imgStartRatio * IMG_START_WIDTH,
      imgStartRatio * IMG_START_HEIGHT
    )

    // 开始菜单按钮
    let btnRatio = (databus.screenWidth * 0.4) / IMG_EASY_WIDTH
    this.btnEasy = new Button(
      IMG_EASY_SRC,
      (databus.screenWidth - btnRatio * IMG_EASY_WIDTH) / 2,
      (databus.screenHeight - btnRatio * IMG_EASY_HEIGHT) / 2 - btnRatio * IMG_EASY_HEIGHT * 1.5,
      btnRatio * IMG_EASY_WIDTH,
      btnRatio * IMG_EASY_HEIGHT
    )

    this.btnMiddle = new Button(
      IMG_MIDDLE_SRC,
      (databus.screenWidth - btnRatio * IMG_MIDDLE_WIDTH) / 2,
      (databus.screenHeight - btnRatio * IMG_MIDDLE_HEIGHT) / 2,
      btnRatio * IMG_MIDDLE_WIDTH,
      btnRatio * IMG_MIDDLE_HEIGHT
    )

    this.btnHard = new Button(
      IMG_HARD_SRC,
      (databus.screenWidth - btnRatio * IMG_HARD_WIDTH) / 2,
      (databus.screenHeight - btnRatio * IMG_HARD_HEIGHT) / 2 + btnRatio * IMG_HARD_HEIGHT * 1.5,
      btnRatio * IMG_HARD_WIDTH,
      btnRatio * IMG_HARD_HEIGHT
    )

    // 时间块
    let timeRatio = (databus.screenWidth * 0.16) / IMG_TIME_WIDTH
    this.timeBanner = new Button(
      IMG_TIME_SRC,
      databus.contentPadding,
      databus.contentPaddingTop - (timeRatio * IMG_TIME_HEIGHT + helpButtonPadding),
      timeRatio * IMG_TIME_WIDTH,
      timeRatio * IMG_TIME_HEIGHT
    )

    // 重玩按钮
    let replayRatio = (databus.screenWidth * 0.12) / IMG_REPLAY_WIDTH
    this.btnReplay = new Button(
      IMG_REPLAY_SRC,
      (databus.contentPadding + databus.contentWidth) - replayRatio * IMG_REPLAY_WIDTH,
      databus.contentPaddingTop - (replayRatio * IMG_REPLAY_HEIGHT + helpButtonPadding),
      replayRatio * IMG_REPLAY_WIDTH,
      replayRatio * IMG_REPLAY_HEIGHT
    )

    // 提示按钮
    let hintRatio = (databus.screenWidth * 0.12) / IMG_HINT_WIDTH
    this.btnHint = new Button(
      IMG_HINT_SRC,
      this.btnReplay.x - (hintRatio * IMG_HINT_WIDTH + 10),
      databus.contentPaddingTop - (hintRatio * IMG_HINT_HEIGHT + helpButtonPadding),
      hintRatio * IMG_HINT_WIDTH,
      hintRatio * IMG_HINT_HEIGHT
    )

    let hintContentRatio = (databus.contentWidth * 0.6) / IMG_HINT_CONTENT_WIDTH
    this.hintContent = new Button(
      IMG_HINT_CONTENT_SRC,
      (databus.contentPadding + databus.contentWidth) - hintContentRatio * IMG_HINT_CONTENT_WIDTH,
      databus.contentPaddingTop - (hintContentRatio * IMG_HINT_CONTENT_HEIGHT + helpButtonPadding),
      hintContentRatio * IMG_HINT_CONTENT_WIDTH,
      hintContentRatio * IMG_HINT_CONTENT_HEIGHT
    )

    // 帮助按钮
    let helpRatio = (databus.screenWidth * 0.12) / IMG_HELP_WIDTH
    this.btnHelp = new Button(
      IMG_HELP_SRC,
      this.btnHint.x - (helpRatio * IMG_HELP_WIDTH + 10),
      databus.contentPaddingTop - (helpRatio * IMG_HELP_HEIGHT + helpButtonPadding),
      helpRatio * IMG_HELP_WIDTH,
      helpRatio * IMG_HELP_HEIGHT
    )

    // 帮助内容
    let helpContentHeight = (databus.screenWidth / IMG_HELP_CONTENT_WIDTH) * IMG_HELP_CONTENT_HEIGHT
    this.helpContent = new Button(
      IMG_HELP_CONTENT_SRC,
      0,
      databus.screenHeight - helpContentHeight,
      databus.screenWidth,
      helpContentHeight
    )
  }

  tap (event) {
    if (!databus.gameStart) {
      return this.tapGameStart(event)
    }
    if (!databus.gameOver) {
      return this.tapGamePlaying(event)
    }
    return this.tapGameOver(event)
  }

  tapGameStart (event) {
    if (this.btnEasy.isTapped(event.x, event.y)) {
      databus.stage = 3
      databus.gameStart = true
      databus.puzzleImg = {
        src: PUZZLE_EASY_SRC,
        width: PUZZLE_EASY_WIDTH,
        height: PUZZLE_EASY_HEIGHT
      }
    } else if (this.btnMiddle.isTapped(event.x, event.y)) {
      databus.stage = 4
      databus.gameStart = true
      databus.puzzleImg = {
        src: PUZZLE_MIDDLE_SRC,
        width: PUZZLE_MIDDLE_WIDTH,
        height: PUZZLE_MIDDLE_HEIGHT
      }
    } else if (this.btnHard.isTapped(event.x, event.y)) {
      databus.stage = 5
      databus.gameStart = true
      databus.puzzleImg = {
        src: PUZZLE_HARD_SRC,
        width: PUZZLE_HARD_WIDTH,
        height: PUZZLE_HARD_HEIGHT
      }
    } else {
      return
    }

    // 设定初始的空位
    databus.emptyPosition = (databus.stage * databus.stage) - 1

    // 选择随机地图并将图块放进数列中
    let randomMap = gameMap.getMap(databus.stage)
    for (let i = 0; i < randomMap.length; i++) {
      let position = randomMap[i] - 1
      databus.pieces.push(new Piece(i, position, databus.stage))
    }

    databus.startTime = Date.now()
    this.puzzleImg = new Image()
    this.puzzleImg.src = databus.puzzleImg.src
  }

  tapGamePlaying (event) {
    if (databus.showHelp && this.helpContent.isTapped(event.x, event.y)) {
      databus.showHelp = false
      return
    }

    if (databus.showHint && this.hintContent.isTapped(event.x, event.y)) {
      databus.showHint = false
      return
    }

    if (this.btnReplay.isTapped(event.x, event.y)) {
      databus.reset()
      return
    }

    if (this.btnHelp.isTapped(event.x, event.y)) {
      databus.showHelp = true
      return
    }

    if (this.btnHint.isTapped(event.x, event.y)) {
      databus.showHint = true
    }
  }

  tapGameOver (event) {
    if (this.btnReplay.isTapped(event.x, event.y)) {
      databus.reset()
    }
  }

  render (ctx) {
    if (!databus.gameStart) {
      return this.renderGameStart(ctx)
    }
    if (!databus.gameOver) {
      return this.renderGamePlaying(ctx)
    }
    return this.renderGameOver(ctx)
  }

  renderGameStart (ctx) {
    // 绘制半透明背景
    ctx.fillStyle = 'black'
    ctx.globalAlpha = 0.6
    ctx.fillRect(0, 0, databus.screenWidth, databus.screenHeight)
    ctx.globalAlpha = 1

    this.imgStart.render(ctx)
    this.btnEasy.render(ctx)
    this.btnMiddle.render(ctx)
    this.btnHard.render(ctx)
  }
  renderGamePlaying (ctx) {
    // 绘制时间
    this.timeBanner.render(ctx)
    ctx.fillStyle = '#ffffff'
    ctx.font = '15px Arial'
    ctx.fillText(
      databus.getCurrentTime(),
      this.timeBanner.x + (this.timeBanner.width / 2 - 18),
      this.timeBanner.y + (this.timeBanner.height / 2 + 5)
    )

    this.btnHelp.render(ctx)
    this.btnHint.render(ctx)
    this.btnReplay.render(ctx)
    if (databus.showHelp) {
      ctx.fillStyle = 'black'
      ctx.globalAlpha = 0.6
      ctx.fillRect(0, 0, databus.screenWidth, databus.screenHeight)
      ctx.globalAlpha = 1
      this.helpContent.render(ctx)
    }
    if (databus.showHint) {
      ctx.drawImage(
        this.puzzleImg,
        this.hintContent.x,
        this.hintContent.y,
        this.hintContent.width,
        this.hintContent.height
      )
      this.hintContent.render(ctx)
    }
  }

  renderGameOver (ctx, score) {
    ctx.drawImage(
      this.puzzleImg,
      databus.contentPadding,
      databus.contentPaddingTop,
      databus.contentWidth,
      databus.contentWidth
    )

    this.btnReplay.render(ctx)

    // 绘制半透明背景
    ctx.fillStyle = 'black'
    ctx.globalAlpha = 0.6
    ctx.fillRect(databus.contentPadding, databus.contentPaddingTop, databus.contentWidth, 50)
    ctx.globalAlpha = 1

    ctx.fillStyle = '#ffffff'
    ctx.font = '18px Arial'
    ctx.fillText(
      '恭喜！您用' + databus.finalTime + '完成了拼图！',
      databus.contentPadding + 10,
      databus.contentPaddingTop + 30
    )
  }
}
