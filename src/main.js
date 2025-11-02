import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



import { getImagesByQuery } from './js/pixabay-api.js';
import {
    renderGallery,
    showLoader,
    hideLoader,
    clearGallery,
    showLoadMoreButton,
    hideLoadMoreButton,
    createGallery
} from './js/render-functions.js';

let page = 1;
let query = '';


    const form = document.querySelector('.form');
    const loadMoreButton = document.querySelector('.load-more-hidden');
    const gallery = document.querySelector('.gallery');

    form.addEventListener('submit', onFormSubmit);
    loadMoreButton.addEventListener('click', onLoadMore);

    async function onFormSubmit(event) {
        event.preventDefault();
        query = event.currentTarget.elements["search-text"].value.trim();
    
        if (!query) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter a search query!',
            });
            return;
        }
    
        clearGallery();
        page = 1;
        showLoader();
        hideLoadMoreButton();
        try {
            const data = await getImagesByQuery(query, page);
            hideLoader();
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
                return
            }
            renderGallery(data.hits);
            showLoadMoreButton();
        } catch (error) {
            hideLoader();
              console.error('Error fetching images:', error);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching images. Please try again later.',
            });
        }
    }
    async function onLoadMore() {
        page++;
        showLoader();
        try {
            const data = await getImagesByQuery(query, page);
            hideLoader();
            if (page >= Math.ceil(data.totalHits / 15)) {
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of the search results.",
                });
                return;
            }
            renderGallery(data.hits);
            smoothScrollAfterLoad();
        } catch (error) {
            hideLoader();
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching images. Please try again later.',
            });
        }
    }
    function smoothScrollAfterLoad() {
        const firstCard = document.querySelector('.gallery .gallery__item');
        if (!firstCard) return;
        const { height: cardHeight } = firstCard.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    };
