import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImage } from '../services/ApiServices';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Notification } from 'components/Notification/Notification';
import { AppBox } from './app.styled';

export class App extends Component {
  state = {
    searchImg: '',
    page: 1,
    resolve: [],
    totalImages: null,
    loading: false,
    showLoadMore: false,
    showModal: false,
    bigImg: '',
    imgAlt: '',
  };

  formData = data => {
    this.setState({
      searchImg: data,
      page: 1,
    });
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getBigImageAndAlt = (img, alt) => {
    this.setState({ bigImg: img, imgAlt: alt });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: !prevState.loading,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevFoto = prevState.searchImg;
    const currentFoto = this.state.searchImg;

    if (
      prevState.searchImg !== this.state.searchImg ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const resolve = await fetchImage(this.state.searchImg, this.state.page);
        const resolveArr = resolve.data.hits;

        this.setState(prevState => ({
          resolve: [...prevState.resolve, ...resolveArr],
          loading: false,
          showLoadMore: true,
          totalImages: resolve.data.totalHits,
        }));

        if (prevFoto !== currentFoto) {
          this.setState({
            resolve: [...resolveArr],
            loading: false,
            showLoadMore: true,
            totalImages: resolve.data.totalHits,
          });
        }

        if (resolveArr.length === 0) {
          Notify.warning(
            ' Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ loading: false, resolve: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const { resolve, loading, showModal, bigImg, imgAlt, totalImages } =
      this.state;

    return (
      <AppBox>
        <Searchbar onSubmit={this.formData} />
        {loading && <Loader />}
        <ImageGallery
          getBigImageAndAlt={this.getBigImageAndAlt}
          modalOpen={this.toggleModal}
          images={resolve}
        ></ImageGallery>
        {resolve.length >= 12 && resolve.length !== totalImages && (
          <Button onClick={this.onLoadMore} />
        )}
        {resolve.length === totalImages && (
          <Notification>no more images !</Notification>
        )}

        {showModal && (
          <Modal
            closeModal={this.toggleModal}
            imgSrc={bigImg}
            imgAlt={imgAlt}
          />
        )}
      </AppBox>
    );
  }
}
