import { Component } from 'react';
import { Overlay, ModalBox } from './modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { imgSrc, imgAlt } = this.props;
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalBox>
          <img src={imgSrc} alt={imgAlt} />
        </ModalBox>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,

  closeModal: PropTypes.func.isRequired,
};
