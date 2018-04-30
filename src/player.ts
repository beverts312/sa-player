import { exists } from 'fs';
import { spawn } from 'child_process';

import { PlayerOptions } from './models';

const PLAYER_EXEC = 'mpg123';

/**
 * Simple Audio Player
 * @export
 * @class Player
 */
export class Player {

    constructor(private opts?: PlayerOptions) {}

    /**
     * Plays a file
     * @param {string} filename the file to play
     * @returns {Promise<void>}
     * @memberof Player
     */
    public play(filename: string, opts?: PlayerOptions): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            exists(filename, fileExists => {
                if (!fileExists) {
                    reject(`The file ${filename} does not exist`);
                }
                const process = spawn(PLAYER_EXEC, this.buildArgs(filename, opts), {});
                if (!process) {
                    reject('Could not spawn process');
                }
                process.on('close', resolve);
            });
        });
    }

    private buildArgs(filename: string, playOpts?: PlayerOptions): string[] {
        const opts = { ...this.opts, ...playOpts };
        const args = [filename];
        if (opts.gain) {
            args.push(`--gain ${opts.gain}`);
        }
        if (opts.skip) {
            args.push(`--skip ${opts.skip}`);
        }
        if (opts.frames) {
            args.push(`--frames ${opts.frames}`);
        }
        if (opts.outputDeviceType) {
            args.push(`-o ${opts.outputDeviceType}`);
        }
        if (opts.audioDevice) {
            args.push(`--audiodevice ${opts.audioDevice}`);
        }
        if (opts.au) {
            args.push(`--au ${opts.au}`);
        }
        if (opts.cdr) {
            args.push(`--cdr ${opts.cdr}`);
        }
        if (opts.wave) {
            args.push(`--wav ${opts.wave}`);
        }
        return args;
    }
}