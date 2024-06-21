import css from './App.module.css';
import { useEffect, useState, useRef } from 'react';
import { fetchImages } from '@/services/api.js';
import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from '@/components/ImageGallery/ImageGallery.jsx';
import ImageModal from '@/components/ImageModal/ImageModal.jsx';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from '@/components/Loader/Loader.jsx';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage.jsx';
import SearchBar from '@/components/SearchBar/SearchBar.jsx';

const notify = {
  emptyQuery() {
    return toast('Please enter name of image or photo you want to search');
  },
  emptyResults() {
    return toast('Not found any image or photo');
  },
};

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const newImagesRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (images.length > 0 && newImagesRef.current) {
      const searchBarHeight = searchBarRef.current
        ? searchBarRef.current.getBoundingClientRect().height
        : 0;
      const element = document.getElementById(newImagesRef.current);
      if (element) {
        const topPosition =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          searchBarHeight -
          16;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
      }
    }
  }, [images]);

  useEffect(() => {
    if (!query) return;

    async function loadImages() {
      try {
        setLoading(true);

        const response = await fetchImages(query, page);
        const newImages = response.results;

        if (newImages.length === 0) {
          notify.emptyResults();
          return;
        }

        setImages(prevImages => {
          return [...prevImages, ...newImages];
        });

        if (newImages.length > 0) {
          newImagesRef.current = newImages[0].id;
        }

        setPagesTotal(response.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, [query, page]);

  const handlers = {
    search(e) {
      e.preventDefault();
      const queryStr = e.target.elements.query.value.trim();

      if (queryStr === '') {
        notify.emptyQuery();
        return;
      }

      // Prevent search same query twice
      if (queryStr === query) return;

      setQuery(queryStr);
      setImages([]);
      setPage(1);
    },
    loadNextPage() {
      setPage(page + 1);
    },
    openModal(modalData) {
      setModalData({ ...modalData });
      setIsModalOpen(true);
    },
    closeModal() {
      setIsModalOpen(false);
    },
  };

  return (
    <>
      <SearchBar
        ref={searchBarRef}
        className={css.searchBar}
        onSubmit={handlers.search}
      />

      {error && (
        <div className={css.errorMessage}>
          <ErrorMessage
            text={
              'Whoops, something went wrong! Please try reloading this page!'
            }
          />
        </div>
      )}

      {!error && images.length > 0 && (
        <>
          <ImageGallery
            className={css.imageGallery}
            images={images}
            openModal={handlers.openModal}
          />

          <ImageModal
            isOpen={isModalOpen}
            modalData={modalData}
            closeModal={handlers.closeModal}
          />

          {!loading && page < pagesTotal && (
            <div className={css.loadMoreBtnWrap}>
              <LoadMoreBtn onClick={handlers.loadNextPage} />
            </div>
          )}
        </>
      )}

      {loading && (
        <div className={css.loaderWrap}>
          <Loader />
        </div>
      )}

      <Toaster
        containerStyle={{
          top: 0,
        }}
        toastOptions={{
          duration: 2000,
          style: {
            marginTop: '13px',
            width: '100%',
            maxWidth: '500px',
            border: '2px solid red',
            padding: '8px',
            color: 'red',
            borderRadius: '4px',
          },
        }}
      />
    </>
  );
}
