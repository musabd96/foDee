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
  var email = req.body.email;
  var password = req.body.password;

  
  console.log('email:', email);
  console.log('password:', password);

  conn.query('SELECT * FROM login WHERE login_email = ? AND login_password = ?', [email, password], function(error,loginResults,fields){
    
    if (error) throw error;
    
    
    if(loginResults.length > 0){
      console.log(loginResults);
      // res.json({ isLoggedIn: true})
      var login_email = loginResults[0].login_email;

      conn.query('SELECT * FROM fodee.customer WHERE login_login_email = ?', [login_email], function(error,customerResults,fields){
    
        if (error) throw error;
        
        if(customerResults.length > 0){
          console.log(customerResults);
          console.log('customer info retrieved')
          var customerInfo = customerResults[0];

          res.json({ isLoggedIn: true, 
                      login_email: loginResults[0].login_email, 
                      customer_id: customerInfo.customer_id,
                      customer_fullname: customerInfo.customer_fullname,
                      customer_phone: customerInfo.customer_phone,
                      customer_address: customerInfo.customer_address,
                      customer_city: customerInfo.customer_city,
                      customer_state: customerInfo.customer_state,
                      customer_zipcode: customerInfo.customer_zipcode
                    });
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
  var email = req.body.email;
  var password = req.body.password;

  // Check if the username already exists in the database
  conn.query('SELECT * FROM fodee.login WHERE login_email = ?', [email], function(error, results, fields){
    if (error) throw error;

    if(results.length > 0){
      // Username already exists, send an error response to the client
      res.json({ isRegistered: false, message: 'email already exists' });
    } else{
      // Username doesn't exist, insert the new user into the database
      conn.query('INSERT INTO fodee.login (login_email, login_password) VALUES (?, ?)', [email, password], function(error, customerResults, fields){
        if (error) throw error;
        conn.query('INSERT INTO fodee.customer (login_login_email) VALUES (?)', [email, password], function(error, loginResults, fields){
          if (error) throw error;
          var isNewUser = true;
          res.json({ isRegistered: true, isNewUser: isNewUser  });
          console.log('Registration successful');
        });
          
      });
    }
  });
});



app.listen(4000, () => {
  console.log('Server started on port 4000');
});


