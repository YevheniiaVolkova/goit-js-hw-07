
import { galleryItems } from './gallery-items.js';
// // Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = renderGallery(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onModalOpen);
function renderGallery(items) {
  return items
    .map(
      ({ original, preview, description }) =>
        `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
             </a>
        </div>`,
    )
    .join(' ');
}
const originals = basicLightbox.create(`
    <div class="modal">
        <img src="" alt="" width="800" height="600"/>
    </div>
`);
function onModalOpen(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  originals.element().querySelector('img').src = event.target.dataset.source;
  originals.element().querySelector('img').alt = event.target.alt;

  originals.show();

  window.addEventListener('keydown', onModalClose);
  originals.element().addEventListener('click', onModalClose);
}

function onModalClose(event) {
  if (event.code === 'Escape' || event.currentTarget.nodeName === 'DIV') {
    originals.close();
    window.removeEventListener('keydown', onModalClose);
  }
}