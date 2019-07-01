const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//connecting to db
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const app = express()

  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));

  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM account');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  app.post('/login', async(req,res)=>{
    //adding new users to account, if exist do nothing
    var command = "INSERT INTO account(email,type) VALUES('"+req.body.email+"','user')\
    ON CONFLICT DO NOTHING";
    pool.query(command)
    //grabbing back the id
    const result = await pool.query("SELECT id,type FROM account WHERE email='"+req.body.email+"'");
    const results = { 'results': (result) ? result.rows : null};
    var id = results.results[0].id;
    var type = results.results[0].type;

    console.log(type);
    if (type == "admin"){
      console.log("Welcome admin")
      res.redirect("/db")  //redirecting to admin page
    }
    else{
      console.log("Welcome", req.body.email);
      res.redirect("/db");   //redirecting to normal user page
    }
})

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

