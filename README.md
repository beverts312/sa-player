# Simple Audio Player
Audio player for node

Currently only supports `mpg123`.

### Usage
Install `npm install --save sa-player`

Play stuff
```
import { Player } from 'sa-player';

const player = new Player();
player.play('/path/to/file.mp3').then(() => {
    console.log('I played the file');
}).catch((err) => {
    console.error('An error occurred trying to play your file');
    console.error(err);
});

```