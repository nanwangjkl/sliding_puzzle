import * as PIXI from 'pixi.js'
import core from '../core'
import {
  Puzzle,
  Menu,
  Info,
  Hint,
  Help,
  Timer
} from '../components'

import {
  Constants,
  swipeListener,
  Functions
} from '../utils'
import {
  log
} from 'util'

// 边框宽度为20像素
const BG_BORDER_RATIO = 1.02
const MENU_RATIO = 0.7
const BTN_RATIO = 0.12
const HINT_RATIO = 0.6
const {
  width,
  height
} = core.screen

export default {

  init () {
    this.container = new PIXI.Container()

    // 拼图大小是屏幕宽度的 85%
    this.contentWidth = width * 0.85

    // 画背景图
    this.bg = PIXI.Sprite.from('bg.jpg')
    this.bg.scale.set(width / this.bg.width)
    this.bg.y = height * 0.04
    this.container.addChild(this.bg)

    // 画纸背景
    this.paper = PIXI.Sprite.from('paper.png')
    this.paper.width = this.contentWidth * BG_BORDER_RATIO
    this.paper.height = this.contentWidth * BG_BORDER_RATIO
    this.paper.x = (width - this.paper.width) / 2
    this.paper.y = height - this.paper.width - this.paper.x
    this.container.addChild(this.paper)

    // 画边框
    this.border = PIXI.Sprite.from('border.png')
    this.border.width = this.paper.width
    this.border.height = this.paper.height
    this.border.x = this.paper.x
    this.border.y = this.paper.y
    this.container.addChild(this.border)

    // 重玩按钮
    this.btn_replay = PIXI.Sprite.from('replay.png')
    this.btn_replay.scale.set((width * BTN_RATIO) / this.btn_replay.width)
    this.btn_replay.x = width / 2 + this.contentWidth / 2 - this.btn_replay.width
    this.btn_replay.y = this.border.y - this.btn_replay.height * 1.3
    this.btn_replay.visible = false
    this.btn_replay.interactive = true
    this.btn_replay.on('pointertap', ev => {
      if (this.puzzle) {
        this.destroyPuzzle()
      }
      this.bgMenu.visible = true
      this.mask.visible = true

      this.btn_hint.visible = false
      this.hint.visible = false
      this.btn_help.visible = false
      this.puzzleHelp.visible = false
      this.timer.visible = false
      this.btn_replay.visible = false
    })
    this.container.addChild(this.btn_replay)

    // 提示按钮
    this.btn_hint = PIXI.Sprite.from('hint.png')
    this.btn_hint.scale.set(this.btn_replay.scale.x, this.btn_replay.scale.y)
    this.btn_hint.x = this.btn_replay.x - this.btn_hint.width * 1.3
    this.btn_hint.y = this.btn_replay.y
    this.btn_hint.visible = false
    this.btn_hint.interactive = true
    this.btn_hint.on('pointertap', ev => {
      this.hint.visible = true
    })
    this.container.addChild(this.btn_hint)

    // 帮助按钮
    this.btn_help = PIXI.Sprite.from('help.png')
    this.btn_help.scale.set(this.btn_hint.scale.x, this.btn_hint.scale.y)
    this.btn_help.x = this.btn_hint.x - this.btn_help.width * 1.3
    this.btn_help.y = this.btn_hint.y
    this.btn_help.visible = false
    this.btn_help.interactive = true
    this.btn_help.on('pointertap', ev => {
      this.puzzleHelp.visible = true
    })
    this.container.addChild(this.btn_help)

    // 计时器
    this.timer = new Timer()
    this.timer.scale.set(this.btn_hint.scale.x, this.btn_hint.scale.y)
    this.timer.x = width / 2 - this.contentWidth / 2
    this.timer.y = this.btn_hint.y
    this.timer.visible = false
    this.container.addChild(this.timer)

    // 遮罩层
    this.mask = new PIXI.Graphics()
    this.mask.beginFill(0x000000, 0.6)
    this.mask.drawRect(0, 0, width, height)
    this.mask.endFill()
    this.container.addChild(this.mask)

    // 开始菜单
    this.bgMenu = new Menu(btnType => {
      this.newPuzzle(btnType)
    })
    this.bgMenu.scale.set((width * MENU_RATIO) / this.bgMenu.width)
    this.bgMenu.x = (width - this.bgMenu.width) / 2
    this.bgMenu.y = (height - this.bgMenu.height) / 2
    this.container.addChild(this.bgMenu)

    // 帮助页面
    this.puzzleHelp = new Help()
    this.puzzleHelp.x = 0
    this.puzzleHelp.y = 0
    this.puzzleHelp.visible = false
    this.puzzleHelp.interactive = true
    this.puzzleHelp.on('pointertap', ev => {
      this.puzzleHelp.visible = false
    })
    this.container.addChild(this.puzzleHelp)

    // 游戏时间戳
    this.timeStamp = 0
  },

  initWX () {
    wx.showShareMenu()
    wx.onShareAppMessage(() => {
      // 用户点击了“转发”按钮
      return {
        title: '99%的人拼不出来！你敢试试吗？',
        imageUrl: `static/puzzle/${this.puzzleUrl || 'easy/0.jpg'}`,
        query: encodeURI(`puzzleUrl=${this.puzzleUrl || 'easy/0.jpg'}&gameType=${this.gameType || Constants.EASY}`)
      }
    })

    wx.onShow((res = {}) => {
      if (!res.query.puzzleUrl || !res.query.gameType) {
        return
      }

      if (res.scene === 1007 || res.scene === 1008) {
        if (this.puzzle) {
          this.destroyPuzzle()
        }
        const btnType = Number(res.query.gameType)
        this.newPuzzle(btnType, res.query.puzzleUrl)
      }
    })

    const res = wx.getLaunchOptionsSync()

    if (res.query.puzzleUrl && res.query.gameType) {
      const btnType = Number(res.query.gameType)
      this.newPuzzle(btnType, res.query.puzzleUrl)
    }
  },

  newPuzzle (btnType, puzzleUrl) {
    // 画主要的puzzle
    this.gameType = btnType
    let typeUrl
    switch (btnType) {
      case Constants.EASY:
        typeUrl = 'easy'
        break
      case Constants.MIDDLE:
        typeUrl = 'middle'
        break
      case Constants.HARD:
        typeUrl = 'hard'
        break
      default:
        typeUrl = 'easy'
        break
    }

    this.puzzleUrl = puzzleUrl || `${typeUrl}/${Functions.getRandomInt(5)}.jpg`

    this.puzzle = new Puzzle(this.puzzleUrl, btnType)
    this.info = new Info(this.puzzleUrl)
    this.hint = new Hint(this.puzzleUrl)

    this.puzzle.width = this.contentWidth
    this.puzzle.height = this.contentWidth
    this.puzzle.x = (width - this.puzzle.width) / 2
    this.puzzle.y = height - this.puzzle.width - this.puzzle.x
    swipeListener(this.puzzle, event => {
      this.puzzle.movePieces(event)
      if (!this.puzzle.gameOn && !this.info.visible) {
        this.info.visible = true
        this.info.setText(`恭喜！您用 ${this.timer.getText()} 完成了拼图！`)

        this.btn_hint.visible = false
        this.hint.visible = false
        this.btn_help.visible = false
        this.puzzleHelp.visible = false
        this.timer.visible = false
      }
    })
    this.container.addChildAt(this.puzzle, 3)

    this.info.width = this.contentWidth
    this.info.height = this.contentWidth
    this.info.x = this.puzzle.x
    this.info.y = this.puzzle.y
    this.info.visible = false
    this.container.addChild(this.info)

    this.hint.width = this.contentWidth * HINT_RATIO
    this.hint.height = this.contentWidth * HINT_RATIO
    this.hint.x = width / 2 + this.contentWidth / 2 - this.hint.width
    this.hint.y = this.border.y - this.btn_hint.height * 0.3 - this.hint.height
    this.hint.visible = false
    this.hint.interactive = true
    this.hint.on('pointertap', ev => {
      this.hint.visible = false
    })
    this.container.addChild(this.hint)

    this.timeStamp = 0
    this.bgMenu.visible = false
    this.mask.visible = false

    this.btn_hint.visible = true
    this.btn_help.visible = true
    this.btn_replay.visible = true
    this.timer.visible = true
  },

  destroyPuzzle () {
    this.container.removeChild(this.puzzle)
    this.container.removeChild(this.info)
    this.container.removeChild(this.hint)
    this.puzzle.destroy()
    this.info.destroy()
    this.hint.destroy()
  },

  isTimeGoing () {
    if (this.puzzle.gameOn && !this.puzzleHelp.visible) {
      return true
    }
    return false
  },

  listen () {
    this.container.once('added', () => {
      core.translate(this.bg)
    })
  },

  update (dt) {
    if (this.puzzle && this.puzzle.update) {
      this.puzzle.update()
      if (this.isTimeGoing()) {
        // 在后台的时候 elapsedMS 也在计数，所以不能直接相加
        if (core.ticker.elapsedMS <= 500) {
          this.timeStamp += core.ticker.elapsedMS
          this.timer.setTime(this.timeStamp)
        }
      }
    }
  },

  start () {
    this.init()
    this.initWX()
    // this.listen()
    core.stage.addChild(this.container)
    core.ticker.add(this.update.bind(this))
  }
}
