// Event listener för min submit-knapp 

let input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    let query = document.getElementById('search').value;
    event.preventDefault();
    getAPI(query);
    };
});

// Hämtar API från Flickr

async function getAPI(text) {
    const BASE_URL = 'https://api.flickr.com/services/rest?'
    const METHOD = 'method=flickr.photos.search'
    const KEY = '&api_key=19d3e6e0acfe9c438f368e2c2bab1c5d'
    const FORMAT = "&format=json&nojsoncallback=1"
    const SORT_RELEVANCE = '&sort=relevance'
    let page = document.getElementById('perPage').value;
    const url = `${BASE_URL}${METHOD}${KEY}${SORT_RELEVANCE}${FORMAT}&text=${text}&per_page=${page}`;
    let response = await fetch(url, {method: 'GET'});
    let data = await response.json();
    getImage(data)
    return await data;
}

// Gör om API-respons till bilder i DOMen 

function getImage(data) {
    let output = document.getElementById('outputDiv');
    output.innerHTML = "";
    data.photos.photo.forEach(element => {
        let imgDiv = document.createElement('div')
        imgDiv.innerHTML = (`<img src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg"/>`);
        outputDiv.appendChild(imgDiv);
    });
    lightboxFunction();
}

// Lightbox function 

function lightboxFunction() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    const images = document.querySelectorAll('img')
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active');
            const img = document.createElement('img')
            img.src = image.src
            while(lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img)
        })
    })
    
    lightbox.addEventListener('click', e => {
        if(e.target !== e.currentTarget) return
        lightbox.classList.remove('active')
    })
}

// Play toggler

let myAudio = document.getElementById("myAudio");
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        document.getElementById('playBtn').style.color = 'red';
        myAudio.pause()
    } else {
        myAudio.play();
        document.getElementById('playBtn').style.color = 'lightgreen';
    }
};
    myAudio.onplaying = function() {
        isPlaying = true;
    };
    myAudio.onpause = function() {
        isPlaying = false;
};

let play = document.getElementById('playBtn')

play.addEventListener('click', () => {
    togglePlay();
})
