const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const request = require('request')
var session = require('client-sessions');
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  // ssl: true
  user: 'postgres',
  password: 'pgsqlsucks',
  host: 'localhost',
  database: 'postgres'
});

var movieobj = {category: null, id:null, title:null ,overview:null ,date:null ,poster:null ,language:null ,vote:null ,rating:null}

function retrieve(url) {
  return new Promise((resolve, reject) => {
    request({ url: url, json: true }, function(err, res, body) {
      if (err) reject(err);
      else resolve(body);
    });
  });
}

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.get('/', (req, res) => res.render('pages/index'))
app.get('/', (req, res) => res.render('pages/app'))

app.get('/login', (req, res) => res.render('pages/login',{val:'none'}))
app.get('/register', (req, res) => res.render('pages/register',{val:'none'}))
app.get('/tmdb', function(req,res){
  if (req.session && req.session.user){
    res.render('pages/tmdb')
  }
  else {
    console.log("Unauthorised access TMDB")
    res.redirect('/login')
  }
})

app.get('/user', async function (req,res){

  //retrieving popular data from url
  var urlmv = 'https://api.themoviedb.org/3/discover/movie?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
  // console.log('retrieving popularmv from', urlmv)
  var urltv = 'https://api.themoviedb.org/3/discover/tv?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false'
  // console.log('retrieving populartv from', urltv)
  var popularmv = await retrieve(urlmv);  //contains the data from the api
  var populartv = await retrieve(urltv);

  if (req.session && req.session.user)
  {
    var data = "'" + req.session.user.email + "';"
    pool.query("select fname,lname,password from users where email= " + data, function(err,table){
    if (table.rows.length == 1) {
      pool.query ( "select * from review where email="+data,function(err,result) {
        res.locals.user = table.rows[0]
        if (result.rows.length != null) {
          res.locals.user.rows = result.rows
        }
        res.locals.user.popularmv = popularmv.results;  //adding popularmv to obj
        res.locals.user.populartv = populartv.results;  //adding populartv to obj
        res.render('pages/user',res.locals.user)
      })
    }
    else{
      console.log("Unauthorised access" )
      res.render('pages/app')
    }
    })
  }
  else {
    console.log("Unauthorised access login " )
    res.redirect('/login')
  }
})


app.get('/logout',(req,res)=>{
  console.log("User logout '" + req.session.user.email + "'")
  req.session.reset();
  res.redirect('/')
})

app.get('/edituser', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM users where email= '" + req.session.user.email + "';");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/edituser', result.rows[0] );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
app.get('/details_rev', (req,res)=>{res.render('pages/summary',movieobj)})

app.get('/fsearch',async(req,res)=>{
  try{
    var results = {};
    const client = await pool.connect()
    var data ="SELECT * FROM friends WHERE (email1='"+req.session.user.email+"'OR email2='"+req.session.user.email+"') AND status = 0;"
    const result = await client.query(data);
    results.rows = result.rows,
    results.user = req.session.user.email;   //creating an object to render pending status
    // console.log(results);
    res.render('pages/fsearch',results)
    client.release();
  }
  catch{
    console.log('error user does not exist');
    res.render('pages/login',{val:'block'});
  }
})

app.get('/fmanage', async (req,res)=>{
  try{
    var results = {};
    const client = await pool.connect()
    var data ="SELECT * FROM friends WHERE (email1='"+req.session.user.email+"'OR email2='"+req.session.user.email+"') AND status = 1;"
    const result = await client.query(data);
    results.rows = result.rows,
    results.user = req.session.user.email;   //creating an object to render pending status
    // console.log(results);
    res.render('pages/fmanage',results)
    client.release();
  }
  catch{
    console.log('error user does not exist');
    res.render('pages/login',{val:'block'})
  }
})

app.post('/register', async (req, res) => {
  try {
    const client = await pool.connect()
    var data = "('" + req.body.fname + "','"  + req.body.lname + "','" + req.body.email + "','" + req.body.password + "');"
    const result = await client.query("insert into users values " + data);
    console.log("User created '" + req.body.email + "'")
    res.redirect('/')
    client.release();
  }
  catch (err) {
    console.error("Email exists: Primary key error");
    res.render('pages/register',{val:'block'})
  }
})

//  Abel  | Thomas | a@asd.com | asd123
//  asd   | asd    | a@a.com   | asd
app.post('/login', function( req, res) {
  var data = "'" + req.body.login_email + "';"
  pool.query("select fname,lname,password from users where email= " + data, function(err,table){
    if (table.rows.length == 1) {
      var result = (table.rows[0].password==req.body.login_pass);
      if ( result ){
        console.log("User found '" + req.body.login_email + "' || result " + result )
        var user = {fname:null,lname:null,email:null}
        user.fname = table.rows[0].fname
        user.lname = table.rows[0].lname
        user.email = req.body.login_email
        req.session.user = user
        res.redirect('/user')
      }
      else{
        console.log("User found '" + req.body.login_email + "' || result " + result )
        res.render('pages/login',{val:'block'})
      }
    }
    else {
      console.log("User not found" )
      res.render('pages/login',{val:'block'})
    }
  })
});


app.post('/edituser', async (req, res) => {
  try {
    const client = await pool.connect()
    var data = "fname='" + req.body.fname + "',lname='"  + req.body.lname + "',password='" + req.body.password + "'"
    const result = await client.query("update users set " + data + " where email= '" + req.session.user.email + "';");
    console.log("User Edited")
    res.redirect('/user')
    client.release();
  }
  catch (err) {
    console.error(err);
    res.render('pages/edituser')
  }
})

//tmdb api start
app.post('/searchtv',async(req,res)=>{
  console.log('entered a search value')
  var key = req.body.keyword;
  var front = 'https://api.themoviedb.org/3/search/tv?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&query=';
  var end = '&page=';
  var pg = req.body.pg;
  var url = front + key + end + pg;    //concatenating url
  console.log('fetching data from',url);
  request({
  //fetching data from the url
    url: url,
    json: true
  }, function (error, response, body) {
    //body is going to store json string
    if(!error){
      body.key = key;
      // console.log(body);
      res.render('pages/searchtv',body);
    }
  })
})
app.post('/prevtv',async(req,res)=>{
  console.log('entered a search value')
  var key = req.body.keyword_prev;
  var front = 'https://api.themoviedb.org/3/search/tv?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&query=';
  var end = '&page=';
  var pg = req.body.pg_prev;
  var url = front + key + end + pg;    //concatenating url
  console.log('fetching data from',url);
  request({
  //fetching data from the url
    url: url,
    json: true
  }, function (error, response, body) {
    //body is going to store json string
    if(!error){
      body.key = key;
      // console.log(body);
      res.render('pages/searchtv',body);
    }
  })
})

app.post('/searchmv',async(req,res)=>{
  console.log('entered a search value')
  var front = 'https://api.themoviedb.org/3/search/movie?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&query=';
  var key = req.body.keyword;
  var end = '&page=';
  var pg = req.body.pg
  var url = front + key + end + pg;    //concatenating url
  console.log('fetching data from',url);
  request({
  //fetching data from the url
    url: url,
    json: true
  }, function (error, response, body) {
    //body is going to store json string
    if(!error){
      body.key = key;
      // console.log(body);
      res.render('pages/searchmv',body);
    }
  })
})
app.post('/prevmv',async(req,res)=>{
  console.log('entered a search value')
  var front = 'https://api.themoviedb.org/3/search/movie?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&query=';
  var key = req.body.keyword_prev;
  var end = '&page=';
  var pg = req.body.pg_prev;
  var url = front + key + end + pg;    //concatenating url
  console.log('fetching data from',url);
  request({
  //fetching data from the url
    url: url,
    json: true
  }, function (error, response, body) {
    //body is going to store json string
    if(!error){
      body.key = key;
      // console.log(body);
      res.render('pages/searchmv',body);
    }
  })
})

app.post('/details_rev', (req,res)=>{
  var category = req.body.category;
  var id = req.body.id;
  console.log(id)
  var front = '';
  var end = '?api_key=7558289524aade3e869fbafc8bb9e8fd';
  if (category == "tv") {
    front = 'https://api.themoviedb.org/3/tv/'
  }
  else{
    front = 'https://api.themoviedb.org/3/movie/'
  }
  var url = front + id + end;
  console.log('fetching data from',url);
  request({
  //fetching data from the url
    url: url,
    json: true
  }, function (error, response, body) {
    //body is going to store json string
    if(!error){
      if (category == 'tv') {
        console.log("parse tv data")
        movieobj.date = body.first_air_date,
        movieobj.category = 'tv',
        movieobj.title = body.name
      }
      else {
        console.log("parse mv data")
        movieobj.date = body.release_date,
        movieobj.category ='mv',
        movieobj.title = body.title
      }
      movieobj.id = req.body.id,
      movieobj.overview = body.overview,
      movieobj.poster = body.poster_path,
      movieobj.language = body.original_language,
      movieobj.vote = body.vote_count,
      movieobj.rating = body.vote_average
      res.render('pages/summary',movieobj)
    }
  })
})
// tmdb api end

//friends start
app.post('/sendRequest', async (req,res) =>{
  const client = await pool.connect();
  var check = "SELECT * FROM friends WHERE email1='"+req.body.receiver+"' AND email2='"+req.session.user.email+"';"
  //check is opposite, to confirm that the other party did not send a request and you're not already friends with them"
  var trigger = await client.query(check,async function(error,result){
    if (result.rows.length == 0){
      try{
        var data = "insert into friends values ('"+req.session.user.email+"', '"+req.body.receiver+"',0);";
        client.query(data);
        console.log('sent friend request');
        client.release();
        res.redirect("/fsearch");
      }
      catch{
        console.log("Either you've sent already or does not exist");
        res.redirect("/fsearch");
      }
    }
    else{
      console.log("Not sending request, other party sent you one")
      res.redirect("/fsearch");
    }
  })
})

app.post('/accept', async (req,res)=>{
  try{
    const client = await pool.connect()
    var data = "UPDATE friends set status = 1 WHERE email1='"+req.body.email1+"' AND email2= '"+req.session.user.email+"';"
    console.log(data)
    const result = await client.query(data);
    res.redirect("/fsearch");
    client.release();
  }
  catch{
    console.log("failed to accept");
    res.redirect("/fsearch");
  }
})

app.post('/reject', async (req,res)=>{
  try{
    const client = await pool.connect()
    var data = "DELETE FROM friends WHERE email1='"+req.body.email1+"' AND email2= '"+req.session.user.email+"';"
    console.log(data)
    const result = await client.query(data);
    res.redirect("/fsearch");
    client.release();
  }
  catch{
    console.log("failed to accept");
    res.redirect("/fsearch");
  }
})

app.post('/unfriend', async(req,res)=>{
  try{
    const client = await pool.connect()
    var data = "DELETE FROM friends WHERE \
    (email1='"+req.session.user.email+"' AND email2= '"+req.body.friendEmail+"') OR\
    (email2='"+req.session.user.email+"' AND email1= '"+req.body.friendEmail+"');"
    console.log(data)
    const result = await client.query(data);
    res.redirect("/fmanage");
    client.release();
  }
  catch{
    console.log("failed to unfriend");
    res.redirect("/fmanage");
  }
})
//friends end
app.post('/rateuser', async (req, res) => {
  try {
  	console.log("User has posted review")
    const client = await pool.connect()
    var data = "('" + req.session.user.email + "','"+req.body.id+"', '"+req.body.category+"', \
    '"+req.body.title+"',  "+ req.body.rating +"  , '" + req.body.review + "');"
    const result = await client.query("insert into review values " + data);
    res.redirect('/details_rev')
    client.release();
  }
  catch (err) {
    console.error("Error: " + err);
    res.redirect('/details_rev')
  }
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
module.exports = app;