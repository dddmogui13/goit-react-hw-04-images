import { useState, useEffect, useCallback } from 'react';
import css from './App.module.css';
import { fetchImages } from '../Helpers/images-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [searchData, setSearchData] = useState('');
  const [imagesList, setImagesList] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  console.log(page);

  const handleData = useCallback(async () => {
    try {
      setLoading(true);
      const { totalHits, hits } = await fetchImages(searchData, page);

      if (hits.length < 1) {
        alert('No images found');
        setLoading(false);
        return;
      }

      setImagesList(prev => (page === 1 ? hits : [...prev, ...hits]));
      setTotalHits(totalHits);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [searchData, page]);

  useEffect(() => {
    if (searchData) {
      handleData();
    }
  }, [searchData, page, handleData]);

  const handleSubmit = searchData => {
    setSearchData(searchData);
    setImagesList([]);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />

      {imagesList.length > 0 && <ImageGallery items={imagesList} />}

      {loading && <Loader />}

      {totalHits > 12 && totalHits > imagesList.length && !loading && (
        <Button onClick={handleNextPage} />
      )}
    </div>
  );
};
