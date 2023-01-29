import getImages from './getImages';
import  createLightBox  from './utils/lightBox';
import notify from './utils/notify';
import scrollImage from './utils/scrollImage';

const form = document.querySelector('.search-form');
const loadMoreButton = document.createElement('button');

form.addEventListener('submit', e => {
  const input = document.querySelector('.search-form input');
  e.preventDefault();
  const inputValue = input.value;
  getImages(inputValue).then(data => {
    notify(data);
    addPhotoCards(data.hits);
    addLoadMoreButtonInDom();
  });
});

const addLoadMoreButtonInDom = () => {
  loadMoreButton.classList.add('load-more');
  loadMoreButton.textContent = 'Load more';
  const divButton = document.querySelector('.load-more-button');
  divButton.append(loadMoreButton);
  addEventLoadMoreButton(loadMoreButton);
};
const addEventLoadMoreButton = (loadMoreBtn) => {
  loadMoreBtn.addEventListener('click', () => {
    const input = document.querySelector('.search-form input');
    const inputValue = input.value;
    const loadMore = true;
    getImages(inputValue, loadMore).then(data => {
      addPhotoCards(data.hits, loadMore);
    })
  });
};

const createPhotoCard = card => {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = card;
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');
  photoCard.innerHTML = `
    <a href='${largeImageURL}'><img src='${webformatURL}' alt='${tags}' data-source='${largeImageURL}' /></a>
   <div class='info'>
    <p class='info-item'>
      <b>Likes</b>
      <span class='counts'>${likes}</span>
    </p>
    <p class='info-item'>
      <b>Views</b>
      <span class='counts'>${views}</span>
    </p>
    <p class='info-item'>
      <b>Comments</b>
      <span class='counts'>${comments}</span>
    </p>
    <p class='info-item'>
      <b>Downloads</b>
      <span class='counts'>${downloads}</span>
    </p>
  </div>
  `;
  return photoCard;
};

// add photo cards to DOM
function addPhotoCards(data, loadMore) {
  const photoCards = data.map(createPhotoCard);
  const gallery = document.querySelector('.gallery');
  if (!loadMore) {
    gallery.innerHTML = '';
  }
  gallery.append(...photoCards);
  createLightBox();
  scrollImage();
};

//add endless scroll after loadmore button
const scrollImage = () => {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}



