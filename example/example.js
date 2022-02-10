import path from 'path'
import Player from '../dist/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, 'foo.mp3')
const player = new Player()
player.play(filePath)
setTimeout(() => {
  player.kill()
}, 5000)
