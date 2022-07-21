import { useEffect } from 'react';

import { Overlay, ModalBox } from './modal.styled';
import PropTypes from 'prop-types';

export function Modal({ closeModal, bigImg, imgAlt }) {
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalBox>
        <img src={bigImg} alt={imgAlt} />
      </ModalBox>
    </Overlay>
  );
}

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
