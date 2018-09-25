const Hapi = require('hapi');

const Lab = require('lab');

const { expect } = require('code');

const lab = exports.lab = Lab.script();// eslint-disable-line no-multi-assign

const { it } = lab;
/* eslint-enable  import/no-extraneous-dependencies */
const input = require('./classify.json');// eslint-disable-line import/no-unresolved

const routePlugin = require('../../index');

lab.test('classification Route create', { timeout: 10000 }, async () => {
  async function start() {
    return new Promise(async (resolve, reject) => {
      const server = Hapi.server({
        host: 'localhost',
        port: '6000'
      });
      const options = {
        method: 'POST',
        url: 'localhost:9999/classify',
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
    it('should contain firstClassification ', async () => {
      expect(result.firstClassification).to.exist();
    });
    it('should train labels be array', async () => {
      expect(result.firstClassification).to.be.object();
    });
    it('should contain secondClassification', async () => {
      expect(result.secondClassification).to.exist();
    });
    it('should firstClassification ttla equals to ', async () => {
      expect(result.firstClassification.ttal).to.equal({
        easy: 0.3333333333333333,
        medium: 0.3333333333333333,
        hard: 0.3333333333333333
      });
    });
    it('should firstClassification classified equals to ', async () => {
      expect(result.firstClassification.classified).to.equal({
        easy: 2.023094827160494,
        medium: 1.855758613168724,
        hard: 1.855758613168724
      });
    });
    it('should secondClassification ttla equals to ', async () => {
      expect(result.secondClassification.ttal).to.equal({
        easy: 0.3333333333333333,
        medium: 0.3333333333333333,
        hard: 0.3333333333333333
      });
    });
    it('should secondClassification classified equals to ', async () => {
      expect(result.secondClassification.classified).to.equal({

        easy: 1.3433333333333333,
        medium: 1.5060259259259259,
        hard: 1.6884223991769547
      });
    });
  } catch (err) {
    console.log(err);
  }
});
