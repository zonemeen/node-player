const path = require('path')
const sound = require('../src/index')
const filePath = path.join(__dirname, 'foo.mp3')
sound.play(filePath)
setTimeout(() => {
  sound.kill()
}, 1000)
