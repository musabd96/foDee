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

  conn.query('SELECT * FROM login WHERE login_username = ? AND login_password = ?', [username, password], function(error,loginResults,fields){
    
    if (error) throw error;
    
    console.log(loginResults); 
    
    if(loginResults.length > 0){
      console.log('is login ')
      var customer_customer_id = loginResults[0].customer_customer_id;

      conn.query('SELECT * FROM customer WHERE customer_id = ?', [customer_customer_id], function(error,customerResults,fields){
    
        if (error) throw error;
        
        console.log(customerResults); 
        
        if(customerResults.length > 0){
          console.log('customer info retrieved')
          var customerInfo = customerResults[0];

          res.json({ isLoggedIn: true, 
                      login_username: loginResults[0].login_username, 
                      customer_id: customerInfo.customer_id,
                      customer_fullname: customerInfo.customer_fullname,
                      customer_email: customerInfo.customer_email });
        } else{
          console.log('no customer info retrieved')
          res.json({ isLoggedIn: false });
        }
      });
      
    } else{
      console.log('is not login ')
      res.json({ isLoggedIn: false });
    }
  });
})



app.listen(4000, () => {
  console.log('Server started on port 4000');
});


