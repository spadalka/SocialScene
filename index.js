const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const request = require("request")
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
  // user: 'postgres',
  // password: 'pgsqlsucks',
  // host: 'localhost',
  // database: 'postgres'
});


const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// app.get('/', (req, res) => res.render('pages/index'))
app.get('/', (req, res) => res.render('pages/app'))
app.get('/login', (req, res) => res.render('pages/login'))
app.get('/register', (req, res) => res.render('pages/register'))

//tmdb api start
app.get('/tmdb_api',async(req,res)=>{
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM student');
  const results = { 'results': (result) ? result.rows : null};
  res.render('pages/tmdb_api',results)
})

app.post('/search',async(req,res)=>{
  console.log('entered a search value')
  var key = req.body.keyword;
  var front = 'https://api.themoviedb.org/3/search/movie?api_key=7558289524aade3e869fbafc8bb9e8fd&language=en-US&query=';
  var end = '&page=1&include_adult=false';
  var url = front + key + end;    //concatenating url
  // console.log('fetching data from',url);
  request({
  //fetching data from the url
    url: url,
    json: true
  }, function (error, response, body) {
    //body is going to store json string
    if(!error){
      // console.log(body);
      data = { 'data': (body.results[0]) ? body.results : [] };
      // console.log(data);
      res.render('pages/search',data);
    }
  })
})
// tmdb api end
app.post('/register', function( request, response) {
  var data = "('" + request.body.fname + "','"  + request.body.lname + "','" + request.body.username + "','" + request.body.password + "');"
  pool.query("insert into users values " + data)
  response.redirect('/')
  console.log("User Created")
});

app.post('/login', function( request, response) {
  var data = "'" + request.body.login_user + "';"
  pool.query("select password from users where email= " + data, function(err,table){ 
    var result = (table.rows[0].password==request.body.login_pass);
    response.redirect('/')
    console.log("User found " + data + " result " + result )
  })
});

app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })




app.listen(PORT, () => console.log(`Listening on ${ PORT }`))