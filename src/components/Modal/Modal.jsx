import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { ModalWindow, Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ img, toggleModal }) => {
  useEffect(() => {
    const escapeHandlePress = evt => {
      if (evt.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', escapeHandlePress);

    return () => {
      document.removeEventListener('keydown', escapeHandlePress);
    };
  }, [toggleModal]);

  const overlayHandleClick = evt => {
    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={overlayHandleClick}>
      <ModalWindow>
        <ModalImg src={img} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
