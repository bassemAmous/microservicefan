const Hapi = require('hapi');

const Lab = require('lab');

const { expect } = require('code');

const lab = exports.lab = Lab.script();// eslint-disable-line no-multi-assign

const { it } = lab;
/* eslint-enable  import/no-extraneous-dependencies */
const input = require('./train.json');// eslint-disable-line import/no-unresolved

const routePlugin = require('../../index');

lab.test('train Route create', { timeout: 10000 }, async () => {
  async function start() {
    return new Promise(async (resolve, reject) => {
      const server = Hapi.server({
        host: 'localhost',
        port: '7000'
      });
      const options = {
        method: 'POST',
        url: 'localhost:9999/train',
        payload: input
      };
      try {
        await server.start();
        await server.register(routePlugin);
        const result = await server.inject(options);
        resolve(JSON.parse(result.payload));
      } catch (err) {
        reject(err);
      }
    });
  }
  try {
    const result = await start();
    it('should contain answer', () => {
      expect(result).to.exist();
    });
    it('should contain train countLabs ', async () => {
      expect(result.train.countLabs).to.exist();
    });
    it('should contain train labels ', async () => {
      expect(result.train.labels).to.exist();
    });

    it('should train labels be array', async () => {
      expect(result.train.labels).to.be.array();
    });
    it('should contain train songs ', async () => {
      expect(result.train.songs).to.exist();
    });
    it('should contain allChords', async () => {
      expect(result.train.allChords).to.exist();
    });
    //* ** */
    it('should contain train countLabs ', async () => {
      expect(result.train.countLabs).to.equal({
        easy: 3,
        medium: 3,
        hard: 3
      });
    });
    it('should contain train labels ', async () => {
      expect(result.train.labels).to.equal([
        'easy',
        'easy',
        'easy',
        'medium',
        'medium',
        'medium',
        'hard',
        'hard',
        'hard'
      ]);
    });
    it('should contain allChords', async () => {
      expect(result.train.allChords).to.equal([
        'c',
        'cmaj7',
        'f',
        'am',
        'dm',
        'g',
        'e7',
        'em',
        'bb',
        'a',
        'bbm',
        'cm',
        'eb',
        'fm',
        'ab',
        'gsus4',
        'b',
        'bsus4',
        'cmsus4',
        'cm6',
        'bm7',
        'e',
        'b7',
        'em7',
        'a7',
        'f7',
        'cdim',
        'eb7',
        'd7',
        'db7',
        'gmaj7',
        'g7',
        'd#m',
        'g#',
        'f#',
        'g#m',
        'c#'
      ]);
    });
    // same thing for songs...
  } catch (err) {
    console.log(err);
  }
});
