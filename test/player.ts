import * as fs from 'fs';
import * as child_process from 'child_process';

import { Player, PlayerOptions, DeviceType } from '../src';
import { MockProcess } from './helpers/mock-process';

describe('Player', () => {
    let sut: Player;

    beforeEach(() => {
        sut = new Player();
    });

    afterEach(() => {
        sut = undefined;
    });

    describe('play', () => {
        let existSpy: jest.SpyInstance;
        let spawnSpy: jest.SpyInstance;
        beforeEach(() => {
            existSpy = jest.spyOn(fs, 'exists');
            spawnSpy = jest.spyOn(child_process, 'spawn');
            spawnSpy.mockImplementation(() => undefined);
        });

        it('should throw error if file does not exist', (done) => {
            existSpy.mockImplementation((file, callback) => callback(false));
            return sut.play('test').catch(err => {
                expect(existSpy.mock.calls[0][0]).toBe('test');
                expect(err).toBe('The file test does not exist');
                done();
            });
        });

        it('should throw error if process cant spawn', (done) => {
            existSpy.mockImplementation((file, callback) => callback(true));
            return sut.play('test').catch(err => {
                expect(spawnSpy).toHaveBeenCalledWith('mpg123', ['test'], {});
                expect(err).toBe('Could not spawn process');
                done();
            });
        });

        it('should resolve on process close', (done) => {
            const mockProcess = new MockProcess();
            existSpy.mockImplementation((file, callback) => callback(true));
            spawnSpy.mockImplementation(() => mockProcess);
            sut.play('test').then(() => {
                done();
            }).catch(fail);
            mockProcess.close();
        });

        describe('options', () => {
            let opts: PlayerOptions;
            let mockProcess: MockProcess;
            beforeEach(() => {
                mockProcess = new MockProcess();
                existSpy.mockImplementation((file, callback) => callback(true));
                spawnSpy.mockImplementation(() => mockProcess);
                opts = {};
            });

            describe('gain', () => {
                it('takes class value', (done) => {
                    opts.gain = 100;
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--gain 100'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.gain = 100;
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--gain 100'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });

            describe('skip', () => {
                it('takes class value', (done) => {
                    opts.skip = 100;
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--skip 100'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.skip = 100;
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--skip 100'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });

            describe('frames', () => {
                it('takes class value', (done) => {
                    opts.frames = 100;
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--frames 100'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.frames = 100;
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--frames 100'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });

            describe('outputDeviceType', () => {
                it('takes class value', (done) => {
                    opts.outputDeviceType = DeviceType.ALSA;
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '-o alsa(09)'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.outputDeviceType = DeviceType.ALSA;
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '-o alsa(09)'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });

            describe('audioDevice', () => {
                it('takes class value', (done) => {
                    opts.audioDevice = 'device';
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--audiodevice device'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.audioDevice = 'device';
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--audiodevice device'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });

            describe('au', () => {
                it('takes class value', (done) => {
                    opts.au = 'farts';
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--au farts'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.au = 'farts';
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--au farts'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });

            describe('cdr', () => {
                it('takes class value', (done) => {
                    opts.cdr = 'farts';
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--cdr farts'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.cdr = 'farts';
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--cdr farts'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });

            describe('wave', () => {
                it('takes class value', (done) => {
                    opts.wave = 'farts';
                    sut = new Player(opts);
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test').then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--wav farts'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });

                it('takes play value', (done) => {
                    opts.wave = 'farts';
                    existSpy.mockImplementation((file, callback) => callback(true));
                    sut.play('test', opts).then(() => {
                        expect(spawnSpy).toBeCalledWith('mpg123', ['test', '--wav farts'], {});
                        done();
                    }).catch(fail);
                    mockProcess.close();
                });
            });
        });
    });
});