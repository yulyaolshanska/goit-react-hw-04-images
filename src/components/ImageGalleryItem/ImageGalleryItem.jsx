import { useState } from 'react';

import { GalleryItem, GalleryImage } from './imageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ imgSrc, imgAlt, bigImg, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <GalleryItem
      id={id}
      onClick={() => {
        toggleModal();
      }}
    >
      <GalleryImage src={imgSrc} alt={imgAlt} />
      {isModalOpen && (
        <Modal closeModal={toggleModal} bigImg={bigImg} imgAlt={imgAlt} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
