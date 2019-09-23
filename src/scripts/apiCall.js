class Client {
    constructor () {
        this.token = "4a510e0d"
    }

    async getMovieData(movie) {
        let response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${this.token}&${movie}`);
        let data = await response.json();
        return data;
    }
}

export {Client};