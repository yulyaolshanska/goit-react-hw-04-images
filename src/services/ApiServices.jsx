import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27514706-1af0f4bdda68331af5d6dbbc9';

export async function fetchImage(searchQwery, page) {
  return await axios.get(
    `${BASE_URL}?key=${KEY}&q=${searchQwery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
