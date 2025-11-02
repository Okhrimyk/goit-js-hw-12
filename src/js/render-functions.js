import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
let gallery_box = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    enableKeyboard: true,
    showCounter: true,
    scrollZoom: true,
    loop: true,
    overlayOpacity: 0.9,
    animationSpeed: 250
});
const loader = document.querySelector('.loader');
function showLoader() {
    loader.classList.add('visible');
};
function hideLoader() {
    loader.classList.remove('visible');
}

function clearGallery() {
    const galleryContainer = document.querySelector('.gallery');
    if (galleryContainer) galleryContainer.innerHTML = '';
}

function createGallery(images) {
    return images.map(
        ({ previewURL, largeImageURL, tags, likes, views, comments, downloads }) => 
            `<li class="gallery__item">
                <a class="gallery__link" href="${largeImageURL}">
                    <img class="gallery__image" src="${previewURL}" alt="${tags}" />
                    <div class="info">
                        <p><b>Likes:</b> ${likes}</p>
                        <p><b>Views:</b> ${views}</p>
                        <p><b>Comments:</b> ${comments}</p>
                        <p><b>Downloads:</b> ${downloads}</p>
                    </div>
                </a>
            </li>`)
    .join("");
}

function renderGallery(images) {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.insertAdjacentHTML("beforeend", createGallery(images));
    gallery_box.refresh();
}
const loadMoreButton = document.querySelector('.load-more-hidden');
function showLoadMoreButton() {

    loadMoreButton.classList.replace('load-more-hidden', 'load-more');
}
function hideLoadMoreButton() {
      loadMoreButton.classList.replace('load-more', 'load-more-hidden');
}


export { createGallery, renderGallery, showLoader, hideLoader, clearGallery, showLoadMoreButton, hideLoadMoreButton };