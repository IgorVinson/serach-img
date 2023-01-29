import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const createLightBox = () => {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });
  lightbox.refresh();
};

export default createLightBox;