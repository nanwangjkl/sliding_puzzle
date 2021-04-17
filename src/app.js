import { game, prepare } from './scenes'

prepare().then(() => {
  game.start()
})
