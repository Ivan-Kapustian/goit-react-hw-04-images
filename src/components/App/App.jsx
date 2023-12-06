import React, { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './app.styled';
import { GlobalStyle } from '../GlobalStyle.styled';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    localStorage.setItem('search-value', JSON.stringify(searchValue));
  }, [searchValue]);

  const onSearchFormSubmit = searchValue => {
    setSearchValue(searchValue);
  };

  const toggleModal = img => {
    setModalOpened(prevModalOpened => !prevModalOpened);
    setModalImage(img);
  };

  return (
    <>
      <GlobalStyle $modalOpened={modalOpened} />
      <AppContainer>
        <Searchbar onSubmit={onSearchFormSubmit} />
        <ImageGallery searchValue={searchValue} toggleModal={toggleModal} />
        {modalOpened && <Modal toggleModal={toggleModal} img={modalImage} />}
        <ToastContainer />
      </AppContainer>
    </>
  );
};

export default App;
