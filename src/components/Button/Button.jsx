import PropTypes from 'prop-types';
import { ButtonLoadMore } from './button.styled';

export const Button = ({ onClick }) => {
  return (
    <ButtonLoadMore type="button " onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
