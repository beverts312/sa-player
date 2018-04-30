import { exists } from 'fs';
import { spawn } from 'child_process';

const PLAYER_EXEC = 'mpg123';

/**
 * Simple Audio Player
 * @export
 * @class Player
 */
export class Player {

    /**
     * Plays a file
     * @param {string} filename the file to play
     * @returns {Promise<void>}
     * @memberof Player
     */
    public play(filename: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            exists(filename, exists => {
                if (!exists) {
                    reject(`The file ${filename} does not exist`);
                }
                const process = spawn(PLAYER_EXEC, [filename], {});
                if (!process) {
                    reject('Could not spawn process');
                }
                process.on('close', resolve);
            });
        });
    }
}