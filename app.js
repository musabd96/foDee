const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded({ extended: true });

const app = express();
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0909',
    database: 'fodee'
});

conn.connect(function(error){
    if (error) throw error;
    else console.log('connected to the database successfully!');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', encoder, function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  console.log(username, password);
  console.log(typeof username);
  console.log(typeof password);

  conn.query('SELECT * FROM login WHERE login_username = ? AND login_password = ?', [username, password], function(error,results,fields){
    
    if (error) throw error;
    
    console.log(results); 
    
    if(results.length > 0){
      console.log('is login ')
      res.json({ isLoggedIn: true, login_username: results[0].login_username, customer_customer_id: results[0].customer_customer_id });
    } else{
      console.log('is not login ')
      res.json({ isLoggedIn: false });
    }
  });
})


app.listen(4000, () => {
  console.log('Server started on port 4000');
});


