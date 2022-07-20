import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
// import css from './searchbar.module.css';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormLabel,
  SearchbarHeader,
} from './searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    if (query) {
      onSubmit(query);
      // this.setState({
      //   query: '',
      // });
    } else if (query === '') {
      Notify.warning("You didn't enter anything to search");
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit} onChange={this.handleChange}>
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
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
