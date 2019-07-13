const db = require("../database");

class Users {
    static getInfo (id, callback) {
        db.query(`select first_name, last_name, email from users WHERE ${id} = id`, function(err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (id, fname, lname, email, callback) {
        db.query(`INSERT INTO users (id, first_name, last_name, email) VALUES (${id}, ${fname}, ${lname}, ${email})`, function(err, res) {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Users;