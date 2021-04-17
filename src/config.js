export default {
  // cdn: 'http://pfarurkns.bkt.clouddn.com/sliding',
  // cdn: `${location.origin}/game`,
  cdn: location.origin ? `${location.origin}/game` : 'http://pfarurkns.bkt.clouddn.com/sliding',
  bkgColor: 0x9ddadb,
  zoom: {
    mix: [],
    get min () { return Math.min(...this.mix) },
    get max () { return Math.max(...this.mix) }
  },
  screen: {
    width: 750,
    height: 1334,
    resolution: 1,
    mode: 'portrait',
    get ratio () { return this.width / this.height }
  },
  design: {
    width: 750,
    height: 1334,
    mode: 'portrait',
    get ratio () { return this.width / this.height }
  },
  scene: null
}
