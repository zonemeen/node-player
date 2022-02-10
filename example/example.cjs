const path = require('path')
const { Player } = require('../dist/index.cjs')
const filePath = path.join(__dirname, 'foo.mp3')
const player = new Player()
player.play(filePath, 0.1)
setTimeout(() => {
  player.kill()
}, 5000)
