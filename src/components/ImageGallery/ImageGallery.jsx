import css from './ImageGallery.module.css';
import ImageCard from '@/components/ImageCard/ImageCard.jsx';
import clsx from 'clsx';

export default function ImageGallery({ images, className, openModal }) {
  const listClasses = clsx(css.list, className);

  return (
    <ul className={listClasses}>
      {images.map(image => (
        <li key={image.id} className={css.listItem} id={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
