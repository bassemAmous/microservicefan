/**
     * classify the points.
     * @param {Array} chords - array to classify...
     * @param {object} labelProbabilities - labels of probablity...
     * @param {object} probabilityOfChordsInLabels - this the probality of chords of ...
     * @return {object} returns object of classified and ttal ...
     */
const classify = async function classify(chords, labelProbabilities, probabilityOfChordsInLabels) {
  const ttal = Object.assign({}, labelProbabilities);
  const classified = {};
  Object.keys(ttal).forEach((obj) => {
    let first = labelProbabilities[obj] + 1.01;
    chords.forEach((chord) => {
      const probabilityOfChordInLabel = probabilityOfChordsInLabels[obj][chord];
      if (probabilityOfChordInLabel === undefined) {
        /*eslint-disable */
        first + 1.01;
          /* eslint-enable */
      } else {
        first *= (probabilityOfChordInLabel + 1.01);
      }
    });
    classified[obj] = first;
  });
  return { ttal, classified };
};
module.exports = {
  classify
};
