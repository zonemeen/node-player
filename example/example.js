const path = require('path')
const { nPlayer } = require('../dist/index.js')
const filePath = path.join(__dirname, 'foo.mp3')
nPlayer.play(filePath)
setTimeout(() => {
  nPlayer.kill()
}, 5000)
