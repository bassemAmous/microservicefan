
/**
     * set Chord Counts In Labels the points.
     * @param {Map} chords - map with key of label and chords as value ...
     * @param {object} chordCountsInLabels -  labels count...
     * @return {object} returns object chordCountsInLabels ...
     */
const setChordCountsInLabels = function setChordCountsInLabels(songs, chordCountsInLabels) {
  const chordsCountsInLabels = chordCountsInLabels;
  songs.forEach((i) => {
    if (chordsCountsInLabels[i[0]] === undefined) {
      chordsCountsInLabels[i[0]] = {};
    } i[1].forEach((j) => {
      if (chordsCountsInLabels[i[0]][j] > 0) {
        chordsCountsInLabels[i[0]][j] += 1;
      } else {
        chordsCountsInLabels[i[0]][j] = 1;
      }
    });
  });
  return chordsCountsInLabels;
};

const setProbabilityOfChordsInLabels = function setProbabilityOfChordsInLabels(
  chordCountsInLabels,
  songs
) {
  const probabilityOfChordsInLabels = chordCountsInLabels;
  Object.keys(probabilityOfChordsInLabels).forEach((i) => {
    Object.keys(probabilityOfChordsInLabels[i]).forEach((j) => {
      probabilityOfChordsInLabels[i][j] =
(probabilityOfChordsInLabels[i][j] * 1.0) / songs.length;
    });
  });
  return probabilityOfChordsInLabels;
};

module.exports = {
  setChordCountsInLabels,
  setProbabilityOfChordsInLabels
};

