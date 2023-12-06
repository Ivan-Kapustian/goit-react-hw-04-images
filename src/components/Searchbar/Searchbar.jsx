import { useState } from 'react';
import { toast } from 'react-toastify';
import { GoSearch } from 'react-icons/go';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const onInputChange = evt => {
    setSearchValue(evt.currentTarget.value);
  };

  const onFormSubmit = evt => {
    evt.preventDefault();

    if (!searchValue.trim()) {
      return toast.error('Sorry... Your input is invalid', {
        autoClose: 2500,
        pauseOnHover: false,
      });
    }

    onSubmit(searchValue.trim());
    setSearchValue('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchFormButton>
          <GoSearch size="24" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={onInputChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

export default Searchbar;
