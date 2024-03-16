import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  it('should render img element with provided props', () => {
    const props = {
      width: '200px',
      height: '200px',
      src: 'http://localhost/image_url',
      alt: 'dog',
      onClick: jest.fn(),
    };

    const { getByAltText } = render(<LazyImage {...props} />);

    // Verify that the img element is rendered with the provided props
    const imgElement = getByAltText('dog');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe('http://localhost/image_url');
    expect(imgElement.alt).toBe('dog');
  });

  it('should call onClick handler when the img element is clicked', () => {
    const onClick = jest.fn();
    const props = {
      width: '200px',
      height: '200px',
      src: 'image_url',
      alt: 'dog',
      onClick,
    };

    const { getByAltText } = render(<LazyImage {...props} />);

    // Simulate a click on the img element
    fireEvent.click(getByAltText('dog'));

    // Verify that the onClick handler is called
    expect(onClick).toHaveBeenCalled();
  });
});
