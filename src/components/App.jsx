import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImage } from '../services/ApiServices';
import { Button } from 'components/Button/Button';
import { Notification } from 'components/Notification/Notification';
import { AppBox } from './app.styled';

export function App() {
  const [searchImg, setSearchImg] = useState('');
  const [page, setPage] = useState(1);
  const [resolve, setResolve] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const formData = data => {
    if (searchImg === data) {
      return;
    }
    setSearchImg(data);
    setPage(1);
    setResolve([]);
  };

  const onLoadMore = () => {
    setLoading(true);

    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (searchImg === '') {
      return;
    }

    async function fetchImages() {
      try {
        setLoading(true);
        const resolve = await fetchImage(searchImg, page);
        const resolveArr = resolve.data.hits;

        setResolve(prevState => [...prevState, ...resolveArr]);
        setLoading(false);
        setShowLoadMore(true);
        setTotalImages(resolve.data.totalHits);

        if (resolveArr.length === 0) {
          Notify.warning(
            ' Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchImages();
  }, [searchImg, page]);

  return (
    <AppBox>
      <Searchbar onSubmit={formData} />
      {loading && <Loader />}
      <ImageGallery images={resolve}></ImageGallery>

      {resolve.length >= 12 && resolve.length !== totalImages && (
        <>
          {loading && <Loader />}
          <Button onClick={onLoadMore} />
        </>
      )}
      {resolve.length === totalImages && (
        <Notification>no more images !</Notification>
      )}
    </AppBox>
  );
}
