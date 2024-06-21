import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={css.container} onClick={onClick}>
      Load more images
    </button>
  );
}
