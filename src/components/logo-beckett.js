import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

export const LogoBeckett = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (
    <img
        alt="Select file"
        src="https://upload.wikimedia.org/wikipedia/en/e/e4/Beckett_media_logo.png"
      {...other}
    />
  );
})``;

LogoBeckett.defaultProps = {
  variant: 'primary'
};

LogoBeckett.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
