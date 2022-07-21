import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormLabel,
  SearchbarHeader,
} from './searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (query === '') {
      Notify.warning("You didn't enter anything to search");
      return;
    }

    onSubmit(query);
  };

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase().trim());
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit} onChange={handleChange}>
        <SearchFormButton type="submit">
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormButton>

        <SearchFormInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
