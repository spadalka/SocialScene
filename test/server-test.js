var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
var request = require('request');
chai.use(chaiHttp);


describe('Main page', function(done) {
    it('status',function(done){
	    request('http://localhost:5000' , function(error, response, body) {
	        response.should.have.status(200);
	        done();
    });
    });
});

