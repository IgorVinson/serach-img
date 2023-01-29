import getImages from './getImages';
import Notiflix from "notiflix";

const form = document.querySelector('.search-form');


form.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.querySelector('.search-form input');
  const inputValue = input.value;
  getImages(inputValue).then(data => {
    notify(data);
    addPhotoCards(data);
    //create button and add to DOM
    createLoadMoreButton();
    addEventButton();
  });
})

const createLoadMoreButton = () => {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.classList.add('load-more');
  loadMoreButton.textContent = 'Load more';
  const divButton = document.querySelector('.load-more-button');
  divButton.append(loadMoreButton);
  return loadMoreButton;
}

const loadMoreBtn = document.querySelector('.load-more');
const addEventButton = () => {
  loadMoreBtn.addEventListener('click', () => {
    const input = document.querySelector('.search-form input');
    const inputValue = input.value;
    const loadMore = true;
    getImages(inputValue,loadMore).then(data => {
      addPhotoCards(data,loadMore);
    });
  })
}


// create photo card
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
    <img src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" />
   <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="counts">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class="counts">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="counts">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="counts">${downloads}</span>
    </p>
  </div>
  `;
  return photoCard;
};

// add photo cards to DOM
function addPhotoCards (data,loadMore) {
  const photoCards = data.map(createPhotoCard);
  const gallery = document.querySelector('.gallery');
  if(!loadMore){
    gallery.innerHTML = '';
  }
  gallery.append(...photoCards);
};

// add notification if no images
getImages().then(notify);

function notify(data){
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};