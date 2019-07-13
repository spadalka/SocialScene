const request = require('request-promise');

const API_KEY = "7558289524aade3e869fbafc8bb9e8fd"; // TMDB API Key

class Movies {
    static retrieveByTitle (title, callback) {
        // console.log(`at movies: ${title}`);
        request({
            uri: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not reach TMDB API.' });
        });

    }
}

module.exports = Movies;