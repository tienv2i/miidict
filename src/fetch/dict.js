import axios from 'axios';
const fetchWords = (query, lang = 'Anh') => {
  return axios.get(`/api/v1/words?${lang}_like=${query}&_limit=20`)
};
export { fetchWords };