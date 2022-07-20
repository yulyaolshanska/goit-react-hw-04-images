import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './imageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({
  images,
  modalOpen,
  getBigImageAndAlt,
  // children,
}) => {
  return (
    <ImageGalleryList>
      {images.map(image => {
        return (
          <ImageGalleryItem
            modalOpen={modalOpen}
            key={image.id}
            id={image.id}
            imgSrc={image.webformatURL}
            imgAlt={image.tags}
            bigImg={image.largeImageURL}
            getBigImageAndAlt={getBigImageAndAlt}
          />
        );
      })}
      {/* {children} */}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imgSrc: PropTypes.string,
      bigImg: PropTypes.string,
      imgAlt: PropTypes.string,
    })
  ).isRequired,
  modalOpen: PropTypes.func.isRequired,
  getBigImageAndAlt: PropTypes.func.isRequired,
};
