
/**
     * count labels.
     * @param {object} labelsCounts - count how much labels...
     * @param {string} label - labels which is easy or medium or hard...
     * @return {object} labelCounts - returns label counts ...
     */
const countTheLabels = async function countTheLabels(labelsCounts, label) {
  const labelCounts = Object.assign({}, labelsCounts);
  if (Object.keys(labelCounts).includes(label)) {
    labelCounts[label] += 1;
  } else {
    labelCounts[label] = 1;
  }
  return labelCounts;
};
async function train(labelsCounts, allChords, labels, songs, chords, label) {
  const labelCounts = Object.assign({}, labelsCounts);
  songs.push([label, chords]);
  labels.push(label);
  for (let i = 0; i < chords.length; i += 1) {
    if (!allChords.includes(chords[i])) {
      allChords.push(chords[i]);
    }
  }
  const countLabs = await countTheLabels(labelCounts, label);
  return {
    countLabs, labels, songs, allChords
  };
}
const getNumberOfSongs = function getNumberOfSongs(songs) {
  return songs.length;
};
const setLabelProbabilities = function setLabelProbabilities(
  labelsCounts,
  labelProbabilities,
  songs
) {
  const labelCounts = Object.assign({}, labelsCounts);
  const labelsProbabilities = Object.assign({}, labelProbabilities);
  Object.keys(labelCounts).forEach((label) => {
    const numberOfSongs = getNumberOfSongs(songs);
    labelsProbabilities[label] = labelCounts[label] / numberOfSongs;
  });
  return labelsProbabilities;
};

module.exports = {
  countTheLabels, getNumberOfSongs, setLabelProbabilities, train
};
