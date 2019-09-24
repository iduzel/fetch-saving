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

    searchMovie() {
        this.inputMovie.addEventListener("keydown", (e) => {
            let match = 0;
            this.movies.map(movie => {
                if (this.inputMovie.value === movie) {
                    match++;
                }
            })

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
                    this.movies = [];
                    break;
            }
        })
    }

    getStorage() {
        this.storedMovies = JSON.parse(window.localStorage.getItem("savedMovies"));
        this.storedMovies.map(movie => {
            this.movies.push(movie);
            this.getMovie(movie);
        })
    }

    init() {
        this.searchMovie();
        this.saveMovies();
        this.getStorage();
    }

}

window.addEventListener("load", () => {
    let movies = new Movies();
    movies.init();
})

