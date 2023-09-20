import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38759536-0e0cff3eb22d5dc7d07989c9c';

const imagesPerPage = 12;

export async function getImagesBySearchQuery(query, currentPage) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${query}&page=${currentPage}&per_page=${imagesPerPage}&image_type=photo&orientation=horizontal`
    );

    if (currentPage <= Math.ceil(response.data.totalHits / imagesPerPage)) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}
