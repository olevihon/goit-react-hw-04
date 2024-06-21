import css from './ImageModal.module.css';
import { useState } from 'react';
import { AiFillLike, AiOutlineClose } from 'react-icons/ai';
import Loader from '@/components/Loader/Loader.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: '999',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: 0,
    overflow: 'clip',
    border: '0 none',
    background: 'rgba(0,0,0,0.0)',
  },
};

export default function ImageModal({ isOpen, closeModal, modalData }) {
  const { src, alt, description, likes, width, height } = modalData;

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClose = () => {
    closeModal();
    setImageLoaded(false);
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={handleClose}>
      <div className={css.container}>
        {!imageLoaded && (
          <div className={css.loaderContainer}>
            <Loader color={'white'} />
          </div>
        )}

        <img
          src={src}
          alt={alt}
          className={css.img}
          style={{
            opacity: !imageLoaded ? '0' : '1',
          }}
          onLoad={() => setImageLoaded(true)}
          width={width}
          height={height}
        />

        <button
          type="button"
          className={css.closeBtn}
          onClick={handleClose}
          style={{
            opacity: !imageLoaded ? '0' : '1',
          }}
        >
          <AiOutlineClose className={css.closeBtnIcon} />
        </button>

        {description && (
          <div
            className={css.description}
            style={{
              opacity: !imageLoaded ? '0' : '1',
            }}
          >
            {description}
          </div>
        )}

        {likes && (
          <div
            className={css.likes}
            style={{
              opacity: !imageLoaded ? '0' : '1',
            }}
          >
            <AiFillLike className={css.likesIcon} /> {likes}
          </div>
        )}
      </div>
    </Modal>
  );
}
