// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
import 'babel-polyfill';
// Import any additional modules you want to include below \/
import {Client} from "../scripts/apiCall.js"

class Movies {
    constructor() {
        this.movies = ["amsterdam", "paris"]
        this.client = new Client();
    }

    displayMovie() {
        this.client.getMovieData("love and other drugs").then(data => {
            console.log(data);
        })
    }

}

let movies = new Movies();
movies.displayMovie();
// \/ All of your javascript should go here \/

