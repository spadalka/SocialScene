var express = require('express');
var Movies = require('../models/movies');

var router = express.Router();

router.get('/:title', function (req, res) {
    var title = req.params.title;
    console.log(`at api: ${title}`);

    Movies.retrieveByTitle(title, function (err, movie) {
        console.log(`error: ${err}`);
        console.log(`movie: ${movie}`);

        if (err) {
            console.log(`error`);
            return res.json(err); 
        }
        
        console.log(`2`);

        console.log(`movie: ${movie}`);

        var id = movie.id;
        var title = movie.title;
        var name = movie.name;

        console.log(`id: ${id}`);
        console.log(`title: ${title}`);
        console.log(`name: ${name}`);

        return res.json(movie);
    });
});

module.exports = router;