const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded({ extended: true });
const fs = require('fs');
const app = express();
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// app.post('/', encoder, function(req, res){
//   var email = req.body.email;
//   var password = req.body.password;
  
  

//   conn.query('SELECT * FROM login WHERE login_email = ? AND login_password = ?', [email, password], function(error,loginResults,fields){
    
//     if (error) throw error;
    
    
//     if(loginResults.length > 0){
//       var login_email = loginResults[0].login_email;

//       conn.query('SELECT * FROM fodee.customer WHERE login_login_email = ?', [login_email], function(error,customerResults,fields){
    
//         if (error) throw error;
        
//         if(customerResults.length > 0){
//           var customerInfo = customerResults[0];
//           if(customerInfo.customer_fullname != 'null' ){
//             console.log('its not null')

//           }
//           console.log(customerInfo)
//           res.json({ isLoggedIn: true, 
//                       login_email: loginResults[0].login_email, 
//                       customer_id: customerInfo.customer_id,
//                       customer_fullname: customerInfo.customer_fullname,
//                       customer_phone: customerInfo.customer_phone,
//                       customer_address: customerInfo.customer_address,
//                       customer_city: customerInfo.customer_city,
//                       customer_country: customerInfo.customer_country,
//                       customer_zipcode: customerInfo.customer_zipcode
//                     });
//         } else{
        
//           res.json({ isLoggedIn: false });
//         }
//       });
      
//     } else{

//       res.json({ isLoggedIn: false });
//     }
//   });
// })



app.post('/', encoder, function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  console.log('email: ', email, 'password: ', password)

  fs.readFile('login.json', function(error, loginData){
    if (error) throw error;
    
    var loginResults = JSON.parse(loginData);
    var filteredLoginResults = loginResults.filter(function(login) {
      return login.email === email && login.password === password;
    });
    
    console.log(filteredLoginResults)
    if(filteredLoginResults.length > 0){
      var login_email = filteredLoginResults[0].login_email;

      fs.readFile('customer.json', function(error, customerData){
        if (error) throw error;

        var customerResults = JSON.parse(customerData);
        var filteredCustomerResults = customerResults.filter(function(result) {
          return result.login_login_email === login_email;
        });

        if(filteredCustomerResults.length > 0){
          var customerInfo = filteredCustomerResults[0];
          if(customerInfo.customer_fullname !== null ){
            console.log('its not null')
          }
          console.log(customerInfo);
          res.json({ isLoggedIn: true, 
                      login_email: filteredLoginResults[0].login_email, 
                      customer_id: customerInfo.customer_id,
                      customer_fullname: customerInfo.customer_fullname,
                      customer_phone: customerInfo.customer_phone,
                      customer_address: customerInfo.customer_address,
                      customer_city: customerInfo.customer_city,
                      customer_country: customerInfo.customer_country,
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
});





// handle register request
// app.post('/register', encoder, function(req, res){
//   var email = req.body.email;
//   var password = req.body.password;

//   // Check if the username already exists in the database
//   conn.query('SELECT * FROM fodee.login WHERE login_email = ?', [email], function(error, results, fields){
//     if (error) throw error;

//     if(results.length > 0){
//       // Username already exists, send an error response to the client
//       res.json({ isRegistered: false, message: 'email already exists' });
//     } else{
//       // Username doesn't exist, insert the new user into the database
//       conn.query('INSERT INTO fodee.login (login_email, login_password) VALUES (?, ?)', [email, password], function(error, customerResults, fields){
//         if (error) throw error;
//         conn.query('INSERT INTO fodee.customer (login_login_email) VALUES (?)', [email, password], function(error, loginResults, fields){
//           if (error) throw error;
//           res.json({ isRegistered: true});
//           console.log('Registration successful');
//         });
          
//       });
//     }
//   });
// });



app.post('/register', encoder, function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  console.log('registration form: ', 'email: ' , email , 'password: ', password);
  console.log(fs.readFileSync('login.json').toString())
  // Check if the email already exists in the JSON files
  const loginData = JSON.parse(fs.readFileSync('login.json'));
  const customerData = JSON.parse(fs.readFileSync('customer.json'));

  console.log('loginData:', loginData);
  console.log('customerData:', customerData);

  const emailExists = loginData.some(function(login) {
    return login.email === email;
  });

  
  if (emailExists === true) {
    // Email already exists, send an error response to the client
    console.log('emailExists:', emailExists);
    res.status(409).json({ isRegistered: false, message: 'email already exists' });
  } else {
    console.log('emailExists: rr', emailExists);
    // Email doesn't exist, save the new user to the JSON files
    const loginObject = {
      email,
      password
    };
    console.log('reg ok')
    const customerObject = {
      login_email: email
    };

    // Append the login data to login.json file
    loginData.push(loginObject);
    fs.writeFile('login.json', JSON.stringify(loginData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    // Append the customer data to customer.json file
    customerData.push(customerObject);
    fs.writeFile('customer.json', JSON.stringify(customerData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.json({ isRegistered: true });
    console.log('Registration successful');
  }
});




// account edit

app.post('/saveEdit', encoder, function(req, res){
  var email = req.body.email;
  var fullName = req.body.fullName;
  var phoneNumber = req.body.phoneNumber;
  var address = req.body.address;
  var city = req.body.city;
  var country = req.body.country;
  var zipCode = req.body.zipCode;

  console.log('email: ', email,  'and ',' name: ', fullName)

  console.log(email)
  conn.query('UPDATE fodee.customer SET customer_fullName = ?, customer_phone = ?, customer_address = ?, customer_city = ?, customer_country = ?, customer_zipCode = ? WHERE customer_email = ?', [fullName, phoneNumber, address, city, country, zipCode, email ], function(error, customerResults, fields){
    if (error) throw error;
    res.json({ isSaved: true});
    console.log(email, fullName,);
    console.log('Registration successful');
  }); 
})








app.listen(4000, () => {
  console.log('Server started on port 4000');
});


