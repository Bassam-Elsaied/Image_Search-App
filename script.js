const unSplashKey = "N1bZULdM4FCWyY4TIb5YjsPzEZi0JrJd_kuDTymnmt4";


const fromEl = document.querySelector('form');
const searchBar = document.querySelector("#search");
const searchButton = document.querySelector("#searchButton");

const searchResaults = document.querySelector(".container");
const showButton = document.querySelector("#showMore");

let inputData = '';
let page= 1;

async function searchImage(){
    inputData = searchBar.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${unSplashKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResaults.innerHTML="";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("holder");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href= result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResaults.appendChild(imageWrapper);
    })

    page++
    if (page>1){
        showButton.style.display="block";
    }
}

fromEl.addEventListener('submit', (event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
});
showButton.addEventListener('click', ()=>{
    searchImage();
});