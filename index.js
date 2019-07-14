const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  // ssl: true
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  database: 'postgres'
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