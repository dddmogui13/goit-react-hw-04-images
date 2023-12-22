import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ item }) => {
  const [modalShown, setModalShown] = useState(false);

  const handleOnModalClick = () => {
    console.log('handleModal called');
    setModalShown(prev => !prev);
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className={css.image}
        onClick={handleOnModalClick}
      />
      {modalShown && <Modal item={item} onClose={handleOnModalClick} />}
    </li>
  );
};

export default ImageGalleryItem;
