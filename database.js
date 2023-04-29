const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(express.static('assets'));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0909',
    database: 'fodee'
});

conn.connect(function(error){
    if (error) throw error
    else console.log('connected to the database successfully!')
});

app.get('', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/home', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(4500);
