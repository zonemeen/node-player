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
const { nPlayer } = require('@miqilin21/node-player')
```

esm:

```sh
import { nPlayer } from '@miqilin21/node-player'
```

### Relative path

```sh
nPlayer.play('file.mp3')
```

or

```sh
const path = require('path')
const filePath = path.join(__dirname, 'file.mp3')
nPlayer.play(filePath)
```

### Absolute path

```sh
nPlayer.play('C:\\file.mp3')
```

### Adjusting Volume

```sh
/**
 * 0   = silent
 * 0.5 = default
 * 1   = max volume
 */
const volume = 0.1;
nPlayer.play('file.mp3', volume)
```

## License

Released under [MIT](/LICENSE) by [@miqilin21](https://github.com/miqilin21).




