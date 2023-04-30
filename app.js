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

// handle login request
app.post('/', encoder, function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  
  console.log('email:', username);
  console.log('password:', password);

  conn.query('SELECT * FROM login WHERE login_email = ? AND login_password = ?', [username, password], function(error,loginResults,fields){
    
    if (error) throw error;
    
    
    if(loginResults.length > 0){
      console.log(loginResults);
      
      var customer_id = loginResults[0].customer_customer_id;

      conn.query('SELECT * FROM fodee.customer WHERE customer_id = ?', [customer_id], function(error,customerResults,fields){
    
        if (error) throw error;
        
        if(customerResults.length > 0){
          console.log(customerResults);
          console.log('customer info retrieved')
          var customerInfo = customerResults[0];

          res.json({ isLoggedIn: true, 
                      login_username: loginResults[0].login_username, 
                      login_password: loginResults[0].login_password, 
                      customer_id: customerInfo.customer_id,
                      customer_fullname: customerInfo.customer_fullname,
                      customer_email: customerInfo.customer_email,
                      customer_phone: customerInfo.customer_phone });
        } else{
        
          res.json({ isLoggedIn: false });
        }
      });
      
    } else{

      res.json({ isLoggedIn: false });
    }
  });
})


// handle register request
app.post('/register', encoder, function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // Check if the username already exists in the database
  conn.query('SELECT * FROM login WHERE login_username = ?', [username], function(error, results, fields){
    if (error) throw error;

    if(results.length > 0){
      // Username already exists, send an error response to the client
      res.json({ isRegistered: false, message: 'Username already exists' });
    } else{
      // Username doesn't exist, insert the new user into the database
      conn.query('INSERT INTO customer (customer_fullname, customer_email) VALUES (?, ?)', [username, email], function(error, customerResults, fields){
        if (error) throw error;
        conn.query('SELECT MAX(customer_id) FROM customer;', function(error,maxCustomerResults,fields){
          if (error) throw error;
          if(maxCustomerResults.length > 0){
            var customer_customer_id  = maxCustomerResults[0]['MAX(customer_id)'];
          }
          

          conn.query('INSERT INTO login (login_username, login_password, customer_customer_id) VALUES (?, ?, ?)', [username, password, customer_customer_id], function(error, loginResults, fields){
            if (error) throw error;

            res.json({ isRegistered: true });
            console.log('Registration successful');
          });
        });
          
      });
    }
  });
});



app.listen(4000, () => {
  console.log('Server started on port 4000');
});


