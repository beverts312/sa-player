import * as fs from 'fs';
import * as child_process from 'child_process';

import { Player } from '../src';
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
        });

        it('should throw error if file does not exist', (done) => {
            existSpy.mockImplementation((file, callback) => callback(false));
            sut.play('test').catch(err => {
                expect(existSpy.mock.calls[0][0]).toBe('test');
                expect(err).toBe('The file test does not exist');
                done();
            });
        });

        it('should throw error if process cant spawn', (done) => {
            existSpy.mockImplementation((file, callback) => callback(true));
            spawnSpy.mockImplementation(() => undefined);
            sut.play('test').catch(err => {
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
            });
            mockProcess.close();
        });
    });
});