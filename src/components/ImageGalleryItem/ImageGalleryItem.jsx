import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ smallImg, tags, toggleModal }) {
  return (
    <GalleryItem onClick={toggleModal}>
      <GalleryImage src={smallImg} alt={tags} />
    </GalleryItem>
  );
}
