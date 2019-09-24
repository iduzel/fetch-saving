// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
import 'babel-polyfill';

import { Client } from "../scripts/apiCall.js"
import { View } from "../scripts/view.js"

class Movies {
    constructor() {
        this.client = new Client();
        this.view = new View();
        this.inputMovie = document.getElementById("input");
        this.movies = []
        this.savedMovies;
        this.storedMovies;
    }

    getMovie(movie) {
        this.client.getMovieData(movie).then(data => {
            console.log(data),
                this.view.displayMovieOnPage(data);
        })
    }
    enterMovie() {
        this.inputMovie.addEventListener("keydown", (e) => {
            let match = 0;
            for (let i = 0; i < this.movies.length; i++) {
                if (this.inputMovie.value === this.movies[i]) {
                    match++;
                }
            }
            if ((e.keyCode === 13) && (this.inputMovie.value.length > 0) && (match === 0)) {
                this.getMovie(this.inputMovie.value);
                this.movies.push(this.inputMovie.value);
                this.inputMovie.value = "";
            } else if (match > 0) {
                alert("You've already stored that movie!");
                this.inputMovie.value = "";
            }
        })
    }
    saveMovies() {
        document.querySelector(".container").addEventListener("click", (e) => {
            switch (e.target.className) {
                case "btn-save":
                    this.savedMovies = window.localStorage.setItem("savedMovies", JSON.stringify(this.movies));
                    break;
                case "btn-reset":
                    window.localStorage.removeItem('savedMovies');
                    this.view.removeDisplay();
                    break;
            }
        })
    }
    getStorage() {
        this.storedMovies = JSON.parse(window.localStorage.getItem("savedMovies"));
        if (this.storedMovies.length > 0) {
            this.storedMovies.map(movie => {
                this.getMovie(movie);
            })
        }
    }

    init() {
        this.enterMovie();
        this.saveMovies();
        this.getStorage();
    }

}

window.addEventListener("load", () => {
    let movies = new Movies();
    movies.init();
})

