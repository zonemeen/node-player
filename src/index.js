const { exec } = require('child_process')
const execPromise = require('util').promisify(exec)

const addPresentationCore = `Add-Type -AssemblyName presentationCore;`
const createMediaPlayer = `$player = New-Object system.windows.media.mediaplayer;`
const loadAudioFile = (path) => `$player.open('${path}');`
const playAudio = `$player.Play();`
const stopAudio = `Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;`

const windowPlayCommand = (path, volume) =>
  `powershell -c ${addPresentationCore} ${createMediaPlayer} ${loadAudioFile(
    path
  )} $player.Volume = ${volume}; ${playAudio} ${stopAudio}`

module.exports = {
  play: async (path, volume = 0.5) => {
    /**
     * Window: mediaplayer's volume is from 0 to 1, default is 0.5
     */
    const playCommand = windowPlayCommand(path, volume)
    try {
      await execPromise(playCommand, { windowsHide: true })
    } catch (err) {
      throw err
    }
  },
}
