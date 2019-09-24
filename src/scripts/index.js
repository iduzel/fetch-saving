// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
import 'babel-polyfill';

import {Client} from "../scripts/apiCall.js"
import {View} from "../scripts/view.js"

class Movies {
    constructor() {
        this.client = new Client();
        this.inputMovie = document.getElementById("input");
        this.view = new View ();
        this.movies = []
    }

    getMovie(movie) {
        this.client.getMovieData(movie).then(data => {
            console.log(data), 
            this.view.displayMovieOnPage(data);
        })
    }
    enterMovie() {
        this.inputMovie.addEventListener("keydown", (e) => {
            if ((e.keyCode === 13) && this.inputMovie.value.length > 0) {
                this.getMovie(this.inputMovie.value);
                this.inputMovie.value = "";
            }
        })
    }

}

let movies = new Movies();
movies.enterMovie();

