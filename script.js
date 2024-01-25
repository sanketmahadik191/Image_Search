const accessKey = 'jLMgXFSkBJENfOVcpxSjLhM8gQTirHBn738AQQyGQMg';
const searchForm = document.querySelector('form');
const imageContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const erroeMes = document.querySelector('.errorMes');
const searchByClick = document.querySelector('.searchByClick');

const available = document.querySelector(".availableResults");
let count = 0;
//function to fetch imagesf

let page = 1;
const fetchImages = async(text, pageNo) => {
    if (page === 1) {
        imageContainer.innerHTML = "";
    }
    const url = `https://api.unsplash.com/search/photos?query=${text}&per_page=50&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.total_pages === page) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }

    console.log(data.total_pages);

    data.results.forEach(photo => {
        const imageElemnt = document.createElement('div');
        imageElemnt.classList.add('imageDiv');
        imageElemnt.innerHTML = `<img src="${photo.urls.regular}"/>`;

        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        //crate tecxtx
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);

        imageElemnt.appendChild(overlayElement);
        imageContainer.appendChild(imageElemnt);
        count++;
    })
    if (count === 0) {
        loadMoreBtn.innerText = "No images Search Again..."
    }
    let ans = count * data.total_pages;
    available.innerText = "Available Images-" + ans;
    count = 0;
}



//adding other for load more

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});

searchForm.addEventListener('submit', searching);
searchByClick.addEventListener('click', searching)


function searching(e) {
    e.preventDefault();
    // console.log(searchInput.value);
    const inputText = searchInput.value.trim();

    if (inputText === "") {
        erroeMes.style.display = 'inline';
    } else {
        page = 1;
        fetchImages(inputText, page);
    }
};