import { fetchWords } from '../fetch/dict';

function setCurrentWord(word) {
  return {
    type: 'SET_CURRENT_WORD',
    word: word
  };
}
function setHints (words) {
  return {
    type: 'SET_HINTS',
    words
  };
}
function fetchHints (query, lang) {
  return function (dispatch) {
    return fetchWords(query, lang).then(response => {
      dispatch(setHints(response.data));
    })
  }
}

export { setCurrentWord, fetchHints };