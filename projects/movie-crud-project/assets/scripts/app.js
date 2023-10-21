const VISIBLE_CLASS = "visible";

const addMovieButton = document.getElementById("btn-add-movie");
const addModalView = document.getElementById("add-modal");

const backdrop = document.getElementById("backdrop");

const modalActions = document.querySelector(".modal__actions");
const cancelActionButton = modalActions.firstElementChild;
const addActionButton = modalActions.lastElementChild;

const userInputs = document.getElementsByTagName("input");

const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image-url");
const ratingInput = document.getElementById("rating");

const movieList = document.getElementById("movie-list");

const moviesListSection = document.getElementById("entry-text");

const movies = [];

const updateUI = () => {

    if (movies.length != 0) {
        moviesListSection.style.display = "none";
    
    } else {
        moviesListSection.style.display = "block";
    }

}

function cleanModalForm() {

    titleInput.value = "";
    imageInput.value = "";
    ratingInput.value = "";
}

function backdropBackground() {

    backdrop.classList.toggle(VISIBLE_CLASS);
}

function cleanModalForm() {
    for (const userInput of userInputs) {
        userInput.value = "";    
    }
}

function invinsibleModalView() {
    addModalView.classList.toggle(VISIBLE_CLASS);
}

let isUserInputValid = () => {

    let isTitleEmpty = titleInput.value.trim() !== "" ? true : false;
    let isImageEmpty = imageInput.value.trim() !== "" ? true : false;
    let isRatingEmpty = ratingInput.value !== "" ? true : false;

    if (isTitleEmpty || isImageEmpty || isRatingEmpty) {
        ratingInput.value = ratingInput.value > 5 ? 5 :
                            ratingInput.value < 1 ? 1 : ratingInput.value;
        
        createAndAddMovie(titleInput.value, imageInput.value, ratingInput.value);

        return true;
    } else {
        return false;
    }
}

function createAndAddMovie(title, image, rating) {

    const newMovie = {
        title: title,
        image: image,
        rate: rating
    };

    movies.push(newMovie);
    console.log(movies);
}

addMovieButton.addEventListener("click", () => {
    addModalView.classList.toggle(VISIBLE_CLASS);
    backdropBackground();
});

addActionButton.addEventListener("click", () => {

    if (isUserInputValid()) {
        let newMovie = document.createElement("li");

        newMovie.className = 'movie-element';
        newMovie.innerHTML = `
          <div class="movie-element__image">
            <img src="${imageInput.value}" alt="${titleInput.value}">
          </div>
          <div class="movie-element__info">
            <h2>${titleInput.value}</h2>
            <p>${ratingInput.value}/5 stars</p>
          </div>
        `;
        movieList.append(newMovie);
        invinsibleModalView();
        updateUI();
        cleanModalForm();
        backdropBackground();    
    } else {
        alert("All the values are mandatory!");       
    }    

});

cancelActionButton.addEventListener("click", () => {

    invinsibleModalView();
    cleanModalForm();
    backdropBackground();
});

backdrop.addEventListener("click", () => {
    backdropBackground();
    invinsibleModalView();
});