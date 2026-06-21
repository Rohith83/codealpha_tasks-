import { images } from "./backend.js";

const galleryContainer = document.querySelector(".js-gallery-container");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.querySelector(".js-lightbox");
const lightboxImg = document.querySelector(".js-lightbox-img");
const closeBtn = document.querySelector(".js-close-btn");
const prevBtn = document.querySelector(".js-prev-btn");
const nextBtn = document.querySelector(".js-next-btn");

let currentImages = images;
let currentIndex = 0;

function renderGallery(galleryImages) {
  let galleryHTML = "";

  galleryImages.forEach((image, index) => {
    galleryHTML += `
      <div class="gallery-item" data-index="${index}">
        <img src="${image.src}" alt="${image.title}">
      </div>
    `;
  });

  galleryContainer.innerHTML = galleryHTML;
  setupGalleryClickEvents();
}

function setupGalleryClickEvents() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      currentIndex = Number(item.dataset.index);
      showLightbox();
    });
  });
}

function showLightbox() {
  lightbox.style.display = "flex";
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].title;
}

filterButtons.forEach((imageBtn) => {
  imageBtn.addEventListener("click", () => {
    const category = imageBtn.dataset.category;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    imageBtn.classList.add("active");

    if (category === "all") {
      currentImages = images;
    } else {
      currentImages = images.filter((image) => {
        return image.category === category;
      });
    }

    renderGallery(currentImages);
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= currentImages.length) {
    currentIndex = 0;
  }

  showLightbox();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentImages.length - 1;
  }

  showLightbox();
});

renderGallery(images);