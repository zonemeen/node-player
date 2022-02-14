# node-player

A simple command line player for NodeJS on `Windows` and `MacOS`.

Support .mp3, .wav, .flac and other extensions.

## Install

```sh
npm install @miqilin21/node-player
```

or

```sh
yarn add @miqilin21/node-player
```

## Usage Examples

cjs:

```sh
const { Player } = require('@miqilin21/node-player')
const player = new Player()
```

esm:

```sh
import { Player } from '@miqilin21/node-player'
const player = new Player()
```

### Relative path

cjs：

```sh
const path = require('path')
const filePath = path.join(__dirname, 'file.mp3')
player.play(filePath)
```

esm：

```sh
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, 'foo.mp3')
player.play(filePath)
```

### Absolute path

```sh
player.play('C:\\file.mp3')
```

### Adjusting volume

```sh
/**
 * 0   = silent
 * 0.5 = default
 * 1   = max volume
 */
const volume = 0.1
player.play('file.mp3', volume)
```

### Kill process

```sh
player.kill()
```

## License

Released under [MIT](/LICENSE) by [@zonemeen](https://github.com/zonemeen).




