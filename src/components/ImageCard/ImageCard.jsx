import css from './ImageCard.module.css';

export default function ImageCard({ image, openModal }) {
  const modalData = {
    src: image.urls.regular,
    alt: image.alt_description,
    description: image.description,
    likes: image.likes,
    width: image.width,
    height: image.height,
  };

  return (
    <div className={css.container}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(modalData)}
      />
    </div>
  );
}
