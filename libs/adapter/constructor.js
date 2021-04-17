import HTMLElement from './HTMLElement'


const HTMLImageElement = wx.createImage().constructor

export {HTMLImageElement}


// export class HTMLImageElement extends HTMLElement {
//   constructor() {
//     super('img')
//   }
// }

export class HTMLCanvasElement extends HTMLElement {
  constructor() {
    super('canvas')
  }
}
