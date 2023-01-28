import axios from 'axios';

const key = '33179207-ddce9a2e97b406c17b8415771';

const options = {
  key,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: 'dog',
};

async function getImages() {
  try {
    const results = await axios.get('https://pixabay.com/api/', {
      params: options,
    });
    return results.data.hits;
  } catch (error) {
    console.error(error);
  }
}

export default getImages;
