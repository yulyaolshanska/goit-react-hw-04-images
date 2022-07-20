import PropTypes from 'prop-types';
import { Wrapper } from './notification.styled';

export const Notification = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Notification.propTypes = {
  children: PropTypes.node.isRequired,
};
