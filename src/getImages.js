import axios from 'axios';

const key = '33179207-ddce9a2e97b406c17b8415771';



async function getImages(query, loadMore) {
  try {
    let page = 1;
    if(loadMore){page += 1;}
    const results = await axios.get('https://pixabay.com/api/', {
      params: {
        key,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: query,
        per_page: 40,
        page
      },
    });
    return results.data.hits;
  } catch (error) {
    console.error(error);
  }
}

export default getImages;
