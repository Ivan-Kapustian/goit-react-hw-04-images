import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImagesBySearchQuery } from '../api/api';
import { Gallery } from './ImageGallery.styled';
import { v4 as uuidv4 } from 'uuid';

const ImageGallery = ({ searchValue, toggleModal }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchValue !== '') {
      setImages([]);
      setIsLoading(true);
      setCurrentPage(1);
      fetchImages();
    }
  }, [searchValue, currentPage]);

  const onLoadMoreClick = () => {
    setIsLoading(true);
    setCurrentPage(prevPage => prevPage + 1);
  };

  const fetchImages = async () => {
    try {
      const newImages = await getImagesBySearchQuery(searchValue, currentPage);

      if (!newImages || !newImages.hits || newImages.hits.length === 0) {
        return toast.error('Sorry... There are no such images', {
          autoClose: 2500,
          pauseOnHover: false,
        });
      }

      setImages(prevImages => [...prevImages, ...newImages.hits]);

      if (newImages.hits.length < 12) setIsLoading(false);
    } catch (error) {
      errorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  const errorResponse = error => {
    setError(error.message);
    toast.error(`Sorry... There was an error: ${error.message}`, {
      autoClose: 2500,
      pauseOnHover: false,
    });
  };

  return (
    <>
      <Gallery>
        {images.map(image => (
          <ImageGalleryItem
            key={uuidv4()}
            smallImg={image.webformatURL}
            largeImg={image.largeImageURL}
            tags={image.tags}
            toggleModal={() => toggleModal(image.largeImageURL)}
          />
        ))}
      </Gallery>

      {isLoading && <Loader />}

      {images.length > 0 && <Button onClick={onLoadMoreClick} />}
    </>
  );
};

export default ImageGallery;
