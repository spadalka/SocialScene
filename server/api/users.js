var express = require('express');
var Users = require('../models/users');

var router = express.Router();

router.get('/', function (req, res) {
    var id = req.body.id;
    Users.getInfo(id, function(err, users) {
        if (err)
            return res.json(err);
        return res.json(users);
    });
});

router.post('/', function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var id = req.body.id;
    var email = req.body.email;
    Users.insert(id, fname, lname, email, function(err, result) {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;