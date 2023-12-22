import { useState } from 'react';
import css from './Searchbar.module.css';
import { IoSearch } from 'react-icons/io5';

const Searchbar = ({ onSubmit }) => {
  const [searchData, setSearchData] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchData(value.toLowerCase());
  };

  const handleSearch = e => {
    e.preventDefault();
    onSubmit(searchData);
    setSearchData('');
  };

  return (
    <header className={css.searchbar} onSubmit={handleSearch}>
      <form className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>
            <IoSearch size={25} />
          </span>
        </button>

        <input
          className={css.input}
          type="text"
          name="searchData"
          value={searchData}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
