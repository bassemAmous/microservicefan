const chord = require('./chord/chord');
const classify = require('./classify/classify');
const label = require('./label/label');

exports.services = function allFunctionAsServices() {
// chords
  this.add({ role: 'chord', cmd: 'chordCounts' }, async (msg, done) => {
    try {
      const token = await chord.setChordCountsInLabels(msg.songs, msg.chordCountsInLabels);
      done(null, { answer: token });
    } catch (err) {
      done(null, { error: err });
      console.log(err);
    }
  });

  this.add({ role: 'chord', cmd: 'setProbability' }, async (msg, done) => {
    try {
      const token = await chord.setProbabilityOfChordsInLabels(
        msg.chordCountsInLabels,
        msg.songs
      );
      done(null, { answer: token });
    } catch (err) {
      done(null, { error: err });
      console.log(err);
    }
  });


  // label
  this.add({ role: 'label', cmd: 'countTheLabels' }, async (msg, done) => {
    try {
      const onlineB = await label.countTheLabels(
        msg.chordCountsInLabels,
        msg.songs
      );
      done(null, { answer: onlineB });
    } catch (err) {
      console.log(err);
    }
  });
  this.add({ role: 'label', cmd: 'getNumberOfSongs' }, async (msg, done) => {
    try {
      const onlineB = await label.getNumberOfSongs(msg.songs);
      done(null, { answer: onlineB });
    } catch (err) {
      console.log(err);
    }
  });
  this.add({ role: 'label', cmd: 'train' }, async (msg, done) => {
    try {
      const onlineB = await label.train(
        msg.labelCounts, msg.allChords,
        msg.labels,
        msg.songs,
        msg.chords,
        msg.label
      );
      done(null, { answer: onlineB });
    } catch (err) {
      console.log(err);
    }
  });
  this.add({ role: 'label', cmd: 'labelProba' }, async (msg, done) => {
    try {
      const onlineB = await label.setLabelProbabilities(
        msg.labelCounts,
        msg.labelProbabilities,
        msg.songs
      );
      done(null, { answer: onlineB });
    } catch (err) {
      console.log(err);
    }
  });
  // classify

  this.add({ role: 'classify', cmd: 'final' }, async (msg, done) => {
    try {
      const onlineB = await classify.classify(
        msg.chords,
        msg.labelProbabilities,
        msg.probabilityOfChordsInLabels
      );
      done(null, { answer: onlineB });
    } catch (err) {
      console.log(err);
    }
  });
};
