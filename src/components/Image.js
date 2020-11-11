import React from "react";
import PropTypes from "prop-types";
import styled, { css, keyframes } from "styled-components";

const AnimateIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
	opacity: 1;
	}
`;

const ImageWrapper = styled.div`
  ${() => {
    return css`
      img {
        opacity: 0;
        transition: all 0.7s ease-in;
        animation: ${AnimateIn} 0.25s ease-in both;
      }
    `;
  }}
`;

ImageWrapper.propTypes = {};

const Image = ({ src }) => {
  return (
    <ImageWrapper>
      <img alt="img" src={src} />
    </ImageWrapper>
  );
};
Image.ropTypes = {
  src: PropTypes.string,
};
export default Image;
