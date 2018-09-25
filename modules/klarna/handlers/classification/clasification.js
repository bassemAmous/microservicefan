const seneca = require('../../helpers');
// const Raven = require('../plugins/config/ravenConf'); // eslint-disable-line import/no-unresolved

exports.display = {
  handler: async (req) => {
    try {
      const klarnaInput = req.payload;
      const {
        imagine,
        somewhereOverTheRainbow,
        tooManyCooks,
        iWillFollowYouIntoTheDark,
        babyOneMoreTime,
        creep,
        paperBag,
        toxic,
        bulletproof,
        classification1,
        classification2
      } = klarnaInput;
      // const imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
      // const somewhereOverTheRainbow = ['c', 'em', 'f', 'g', 'am'];
      // const tooManyCooks = ['c', 'g', 'f'];
      // const iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
      // const babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
      // const creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
      // const paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
      //   'em7', 'a7', 'f7', 'b'];
      // const toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
      //   'g7'];
      // const bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
      // const classification1 = ['d', 'g', 'e', 'dm'];
      // const classification2 = ['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m'];


      const t = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: [],
        allChords: [],
        labels: [],
        songs: [],
        chords: imagine,
        label: 'easy'
      });

      const t2 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t.answer.countLabs,
        allChords: t.answer.allChords,
        labels: t.answer.labels,
        songs: t.answer.songs,
        chords: somewhereOverTheRainbow,
        label: 'easy'
      });

      const t3 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t2.answer.countLabs,
        allChords: t2.answer.allChords,
        labels: t2.answer.labels,
        songs: t2.answer.songs,
        chords: tooManyCooks,
        label: 'easy'
      });
      const t4 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t3.answer.countLabs,
        allChords: t3.answer.allChords,
        labels: t3.answer.labels,
        songs: t3.answer.songs,
        chords: iWillFollowYouIntoTheDark,
        label: 'medium'
      });
      const t5 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t4.answer.countLabs,
        allChords: t4.answer.allChords,
        labels: t4.answer.labels,
        songs: t4.answer.songs,
        chords: babyOneMoreTime,
        label: 'medium'
      });
      const t6 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t5.answer.countLabs,
        allChords: t5.answer.allChords,
        labels: t5.answer.labels,
        songs: t5.answer.songs,
        chords: creep,
        label: 'medium'
      });
      const t7 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t6.answer.countLabs,
        allChords: t6.answer.allChords,
        labels: t6.answer.labels,
        songs: t6.answer.songs,
        chords: paperBag,
        label: 'hard'
      });
      const t8 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t7.answer.countLabs,
        allChords: t7.answer.allChords,
        labels: t7.answer.labels,
        songs: t7.answer.songs,
        chords: toxic,
        label: 'hard'
      });
      const t9 = await seneca.asyncAct({
        role: 'label',
        cmd: 'train',
        labelCounts: t8.answer.countLabs,
        allChords: t8.answer.allChords,
        labels: t8.answer.labels,
        songs: t8.answer.songs,
        chords: bulletproof,
        label: 'hard'
      });

      const labelPorba = await seneca.asyncAct({
        role: 'label',
        cmd: 'labelProba',
        labelCounts: t9.answer.countLabs,
        labelProbabilities: [],
        songs: t9.answer.songs
      });

      const ChordssCountsInLabelsq = await seneca.asyncAct({
        role: 'chord',
        cmd: 'chordCounts',
        songs: t9.answer.songs,
        chordCountsInLabels: {}
      });

      const a = await seneca.asyncAct({
        role: 'chord',
        cmd: 'setProbability',
        chordCountsInLabels: ChordssCountsInLabelsq.answer,
        songs: t9.answer.songs
      });

      const firstClassification = await seneca.asyncAct({
        role: 'classify',
        cmd: 'final',
        chords: classification1,
        labelProbabilities: labelPorba.answer,
        probabilityOfChordsInLabels: a.answer
      });
      const secondClassification = await seneca.asyncAct({
        role: 'classify',
        cmd: 'final',
        chords: classification2,
        labelProbabilities: labelPorba.answer,
        probabilityOfChordsInLabels: a.answer
      });
      return {
        firstClassification: firstClassification.answer,
        secondClassification: secondClassification.answer
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
