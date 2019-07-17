const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const request = require('request')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
  // user: 'postgres',
  // password: 'root',
  // host: 'localhost',
  // database: 'postgres'
});

var user = {fname:null,lname:null,email:null}

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.get('/', (req, res) => res.render('pages/index'))
app.get('/', (req, res) => res.render('pages/app'))

app.get('/login', (req, res) => res.render('pages/login',{val:'none'}))
app.get('/register', (req, res) => res.render('pages/register',{val:'none'}))
app.get('/tmdb',(req,res)=>res.render('pages/tmdb'))
app.get('/user',(req,res)=>res.render('pages/user',user))
app.get('/edituser', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM users where email= '" + user.email + "';");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/edituser', result.rows[0] );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.post('/register', async (req, res) => {
  try {
    const client = await pool.connect()
    var data = "('" + req.body.fname + "','"  + req.body.lname + "','" + req.body.email + "','" + req.body.password + "');"
    const result = await client.query("insert into users values " + data);
    res.redirect('/')
    client.release();
  }
  catch (err) {
    console.error("Email exists: Primary key error");
    res.render('pages/register',{val:'block'})
  }
})

//  Abel  | Thomas | a@asd.com | asd123
app.post('/login', function( req, res) {
  var data = "'" + req.body.login_email + "';"
  pool.query("select fname,lname,password from users where email= " + data, function(err,table){
    if (table.rows.length == 1) {
      var result = (table.rows[0].password==req.body.login_pass);
      if ( result ){
        console.log("User found '" + req.body.login_email + "' || result " + result )
        user.fname = table.rows[0].fname
        user.lname = table.rows[0].lname
        user.email = req.body.login_email
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
    const result = await client.query("update users set " + data + " where email= '" + user.email + "';");
    console.log("User Edited")
    user.fname = req.body.fname
    user.lname = req.body.lname
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
app.post('/details', (req,res)=>{
  var data = {
    "id": req.body.id,
    "title":req.body.title,
    "overview":req.body.overview,
    "date": req.body.date,
    "poster": req.body.poster,
    "language": req.body.language
  }
  res.render('pages/summary',data)
})
// tmdb api end

app.post('/rateuser', async (req, res)=>{
  console.log("Nice Nice")
  try {
    const client = await pool.connect()
    var data = "('" + user.email + "', "+req.body.id+" , " + req.body.rating + " , '" + req.body.review + "');"
    const result = await client.query("insert into review values " + data);
    res.redirect('/details')
    client.release();
  }
  catch (err) {
    console.error("Error ");
    res.redirect('/details')
  }
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
module.exports = app;