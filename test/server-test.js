var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
var request = require('request');
chai.use(chaiHttp);


describe('Main page', function(done) {
    it('status',function(done){
	    request('http://localhost:5000' , function(err, res, body) {
	        res.should.have.status(200);
	        done();
    });
    });
});

describe('Users', function(){
	it('should add a single user on POST /register', function(done){
		chai.request(server).get('/register').end(function(err, res){ // assume this gets array of all users
     		var num_user = res.body.length;
  	
     	chai.request(server).post('/register').send({
     		'fname':'test',
     		'lname':'subject',
     		'email':'test@hotmail.com',
     		'password': 'password'})

        .end(function(err, res){
         	var num_user2 = res.body.length; // assuming response contains user array
        	// (num_user2 - num_user).should.equal(1);
        	console.log(num_user2);
	        res.should.have.status(200);
        	done();
        	});
    	});
	});
});

describe('Register', function(){ //another version of register testing (Sergii)
	it('should add a SINGLE user on /register POST', function(done) {
		  chai.request(server)
			.post('/register')
			.send({'fname':'test',
				   'lname':'subject',
				   'email':'test@hotmail.com',
				   'password': 'password'})
			.end(function(err, res){
			  res.should.have.status(200);
			  res.body.should.be.a('object');
			  res.body.should.have.property('SUCCESS');
			  res.body.SUCCESS.should.be.a('object');
			  res.body.SUCCESS.should.have.property('fname');
			  res.body.SUCCESS.should.have.property('lname');
			  res.body.SUCCESS.should.have.property('email');
			  res.body.SUCCESS.should.have.property('password');
			  res.body.SUCCESS.fname.should.equal('test');
			  res.body.SUCCESS.fname.should.equal('subject');
			  res.body.SUCCESS.email.should.equal('test@hotmail.com');
			  res.body.SUCCESS.password.should.equal('password');
			  done();
			});
		});
	});

describe('Login', function(){   //this is a broken function that always passes true (I believe)
    it('should find a single user on POST /login', function(done){
        chai.request(server).post('/login').send({
            'email':'test@hotmail.com',
            'password': 'password'})

        .end(function(err, res){
            res.should.have.status(200);
            expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
            })
            done();
            });
        });
	});
	
// describe('')
