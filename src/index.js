import getImages from './getImages';

const notify = data => {
  console.log(data);
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

getImages().then(notify);

// webformatURL - ссылка на маленькое изображение для списка карточек.
//   largeImageURL - ссылка на большое изображение.
//   tags - строка с описанием изображения. Подойдет для атрибута alt.
//   likes - количество лайков.
//   views - количество просмотров.
//   comments - количество комментариев.
//   downloads - количество загрузок.

// create photo card and add to DOM
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
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
  `;
  return photoCard;
};

// add photo cards to DOM
const addPhotoCards = data => {
  const photoCards = data.map(createPhotoCard);
  const gallery = document.querySelector('.gallery');
  gallery.append(...photoCards);
};

getImages().then(addPhotoCards);

// <div className="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div className="info">
//     <p className="info-item">
//       <b>Likes</b>
//     </p>
//     <p className="info-item">
//       <b>Views</b>
//     </p>
//     <p className="info-item">
//       <b>Comments</b>
//     </p>
//     <p className="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
