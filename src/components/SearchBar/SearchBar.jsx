import { forwardRef } from 'react';
import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import clsx from 'clsx';

// https://react.dev/reference/react/forwardRef#forwardref
const SearchBar = forwardRef(function SearchBar({ onSubmit, className }, ref) {
  const headerClasses = clsx(css.container, className);

  return (
    <header ref={ref} className={headerClasses}>
      <form onSubmit={onSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          <AiOutlineSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
});

export default SearchBar;
