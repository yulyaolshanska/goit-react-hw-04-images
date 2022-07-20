import { GalleryItem, GalleryImage } from './imageGalleryItem.styled';
// import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  imgSrc,
  imgAlt,
  modalOpen,
  bigImg,
  getBigImageAndAlt,
  id,
}) => {
  //   getBigImage(bigImg);
  return (
    <GalleryItem
      id={id}
      onClick={() => {
        getBigImageAndAlt(bigImg, imgAlt);
        modalOpen();
      }}
    >
      <GalleryImage src={imgSrc} alt={imgAlt} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,

  getBigImageAndAlt: PropTypes.func.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
