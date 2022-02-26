import fs from 'fs'
import https from 'https'
import http from 'http'
import path from 'path'
import { command } from 'execa'
import type { ExecaChildProcess } from 'execa'

/* MAC PLAY COMMAND */
const macPlayCommand = (src: string, volume: number) =>
  `afplay \"${src}\" -v ${volume}`

/* WINDOW PLAY COMMANDS */
const addPresentationCore = `Add-Type -AssemblyName presentationCore;`
const createMediaPlayer = `$player = New-Object system.windows.media.mediaplayer;`
const loadAudioFile = (src: string) => `$player.open('${src}');`
const setAudioVolume = (volume: number) => `$player.Volume = ${volume};`
const playAudio = `$player.Play();`
const stopAudio = `Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;`

const windowPlayCommand = (src: string, volume: number) =>
  `powershell -c ${addPresentationCore} ${createMediaPlayer} ${loadAudioFile(
    src
  )} ${setAudioVolume(volume)} ${playAudio} ${stopAudio}`

let subProcess: ExecaChildProcess, filePath: string, isLocal: boolean

class Player {
  play(src: string, volume: number = 0.5) {
    /**
     * Window: mediaplayer's volume is from 0 to 1, default is 0.5
     * Mac: afplay's volume is from 0 to 255, default is 1. However, volume > 2 usually result in distortion.
     * Therefore, it is better to limit the volume on Mac, and set a common scale of 0 to 1 for simplicity
     */
    try {
      const volumeAdjustedByOS =
        process.platform === 'darwin' ? Math.min(2, volume * 2) : volume

      isLocal = !(src.indexOf('http') === 0 || src.indexOf('https') === 0)

      let playCommand: string

      if (isLocal) {
        playCommand =
          process.platform === 'darwin'
            ? macPlayCommand(src, volumeAdjustedByOS)
            : windowPlayCommand(src, volumeAdjustedByOS)

        subProcess = command(playCommand)
      } else {
        const $http = src.indexOf('http') === 0 ? https : http
        $http.get(src, (res) => {
          const extension = path.extname(src).toLowerCase().substring(1)
          const fileSteam = fs.createWriteStream(`temp.${extension}`)
          res.pipe(fileSteam)

          filePath = path.join(process.cwd(), `temp.${extension}`)

          playCommand =
            process.platform === 'darwin'
              ? macPlayCommand(filePath, volumeAdjustedByOS)
              : windowPlayCommand(filePath, volumeAdjustedByOS)

          fileSteam.on('finish', () => {
            subProcess = command(playCommand)
            fileSteam.end()
          })

          process.on('SIGINT', () => {
            fs.unlinkSync(filePath)
            process.exit(0)
          })
          process.on('exit', () => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath)
              process.exit(0)
            }
          })
        })
      }
    } catch (err) {
      throw err
    }
  }
  kill() {
    subProcess.kill()
    if (!isLocal) {
      fs.existsSync(filePath) && fs.unlinkSync(filePath)
    }
  }
}

export { Player }
