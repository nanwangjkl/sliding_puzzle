import DataBus from '../databus'

const BG_IMG_SRC = 'images/bg.jpg'

const BG_BORDER_SRC = 'images/border.png'
const BG_BORDER_WIDTH = 1020
const BG_BORDER_HEIGHT = 1020
const BG_CONTENT_WIDTH = 1000
const BG_CONTENT_HEIGHT = 1000

const BG_PAPER_SRC = 'images/paper.png'
let databus = new DataBus()


/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround {
  constructor(ctx) {
    // super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.img = new Image()
    this.img.src = BG_IMG_SRC

    this.borderImg = new Image()
    this.borderImg.src = BG_BORDER_SRC

    this.paperImg = new Image()
    this.paperImg.src = BG_PAPER_SRC


    // 因为puzzle多一个边框
    // 所以根据contentWidth算出puzzleWidth
    this.puzzleWidth = databus.contentWidth * (BG_BORDER_WIDTH / BG_CONTENT_WIDTH)
    this.puzzlePadding = (databus.screenWidth - this.puzzleWidth) / 2
    this.puzzlePaddingTop = databus.screenHeight - this.puzzleWidth - this.puzzlePadding;

    this.render(ctx)
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      databus.screenWidth,
      databus.screenHeight
    )

    ctx.drawImage(
      this.paperImg,
      this.puzzlePadding,
      this.puzzlePaddingTop,
      this.puzzleWidth,
      this.puzzleWidth
    )
    
    ctx.drawImage(
      this.borderImg,
      this.puzzlePadding,
      this.puzzlePaddingTop,
      this.puzzleWidth,
      this.puzzleWidth
    )


  }
}
