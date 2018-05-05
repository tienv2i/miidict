const dict = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_WORD': 
      return { ...state, currentWord: action.word};
    case 'SET_HINTS':
      return { ...state, hints: action.words};
    default: return { ...state};
  }
};
export default dict;