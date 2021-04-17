export default {
  getValue(v, s) {
    return v === undefined ? s : v
  },
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}