const { command } = require('execa')
const platform = require('os').platform()

/* MAC PLAY COMMAND */
const macPlayCommand = (path, volume) => `afplay \"${path}\" -v ${volume}`

/* WINDOW PLAY COMMANDS */
const addPresentationCore = `Add-Type -AssemblyName presentationCore;`
const createMediaPlayer = `$player = New-Object system.windows.media.mediaplayer;`
const loadAudioFile = (path) => `$player.open('${path}');`
const setAudioVolume = (volume) => `$player.Volume = ${volume};`
const playAudio = `$player.Play();`
const stopAudio = `Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;`

const windowPlayCommand = (path, volume) =>
  `powershell -c ${addPresentationCore} ${createMediaPlayer} ${loadAudioFile(
    path
  )} ${setAudioVolume(volume)} ${playAudio} ${stopAudio}`

let subprocess

module.exports = {
  play(path, volume = 0.5) {
    /**
     * Window: mediaplayer's volume is from 0 to 1, default is 0.5
     * Mac: afplay's volume is from 0 to 255, default is 1. However, volume > 2 usually result in distortion.
     * Therefore, it is better to limit the volume on Mac, and set a common scale of 0 to 1 for simplicity
     */
    const volumeAdjustedByOS =
      platform === 'darwin' ? Math.min(2, volume * 2) : volume

    const playCommand =
      platform === 'darwin'
        ? macPlayCommand(path, volumeAdjustedByOS)
        : windowPlayCommand(path, volumeAdjustedByOS)
    try {
      subprocess = command(playCommand)
    } catch (err) {
      throw err
    }
  },
  kill() {
    subprocess.kill()
  },
}
