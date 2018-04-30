import { DeviceType } from './device-type';

export interface PlayerOptions {
    /**
     * Volume 0-100
     * @type {number}
     * @memberof PlayerOptions
     */
    gain?: number;

    /**
     * Frames to skip
     * @type {number}
     * @memberof PlayerOptions
     */
    skip?: number;

    /**
     * Number of frames to play
     * @type {number}
     * @memberof PlayerOptions
     */
    frames?: number;

    /**
     * Output device type to use
     * @type {DeviceType}
     * @memberof PlayerOptions
     */
    outputDeviceType?: DeviceType;

    /**
     * Audio device to use
     * @type {string}
     * @memberof PlayerOptions
     */
    audioDevice?: string;

    /**
     * Whether or not to use au file for output
     * @type {string}
     * @memberof PlayerOptions
     */
    au?: string;

    /**
     * Whether or not to use cdr file for output
     * @type {string}
     * @memberof PlayerOptions
     */
    cdr?: string;

    /**
     * Whether or not to use wave file for output
     * @type {string}
     * @memberof PlayerOptions
     */
    wave?: string;
}