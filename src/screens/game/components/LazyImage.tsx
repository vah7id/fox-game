import React from 'react';

interface LazyImageProps {
    width: string;
    height: string;
    src: string;
    alt: string;
    onClick: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
    width,
    height,
    src,
    alt,
    onClick
}) => {
    return (
        <div style={{ width, height }}>
            <img
                width={width}
                height={height}
                src={src}
                alt={alt}
                onClick={onClick}
            />
        </div>
    );
};

export default LazyImage;