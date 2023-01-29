import Notiflix from 'notiflix';

export default function notify(data) {
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  } else {
    Notiflix.Notify.success(
      `Hooray! We found ${data.totalHits} images.`,
    );
  }
};