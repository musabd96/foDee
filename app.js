
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded({ extended: true });
const fs = require('fs');
const path = require('path');
const app = express();

const folderPath = path.join(__dirname, 'assets', 'json');

// app.use(express.static('assets'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(4000, () => {
  console.log('Server started on port 4000');
});



// handle login request


/* =============== login request =============== */

app.post('/', encoder, function(req, res){
  var email = req.body.email;
  var password = req.body.password;


  fs.readFile(path.join(folderPath, 'login.json'), function(error, loginData){
    if (error) throw error;
    
    var loginResults = JSON.parse(loginData);
    var filteredLoginResults = loginResults.filter(function(login) {
      return login.email === email && login.password === password;
    });
    
    if(filteredLoginResults.length > 0){
      var customer_email = filteredLoginResults[0].email;

      fs.readFile(path.join(folderPath,'customer.json'), function(error, customerData){
        if (error) throw error;
        var customerResults = JSON.parse(customerData);
        var filteredCustomerResults = customerResults.filter(function(result) {
          return result.customer_email === customer_email;
        });
        
        if(filteredCustomerResults.length > 0){
          var customerInfo = filteredCustomerResults[0];
          if(customerInfo.customer_fullname !== null ){
            
          }
          console.log('login success')
          res.json({ isLoggedIn: true, 
                                
            customer_id: customerInfo.customer_id,
            customer_email: customerInfo.customer_email,
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



/* =============== Register request =============== */
app.post('/register', encoder, function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  // Check if the email already exists in the JSON files
  const loginData = JSON.parse(fs.readFileSync(path.join(folderPath,'login.json')));
  const customerData = JSON.parse(fs.readFileSync(path.join(folderPath,'customer.json')));

  

  const emailExists = loginData.some(function(login) {
    return login.email === email;
  });

  
  if (emailExists === true) {
    res.status(409).json({ isRegistered: false, message: 'email already exists' });
  } else {
    // Email doesn't exist, save the new user to the JSON files
    
    // Generate the customer ID based on the last ID in the customer data
    const lastCustomerId = customerData.length > 0 ? parseInt(customerData[customerData.length - 1].customer_id) : 0;
    const newCustomerId = (lastCustomerId + 1).toString();
    
    const loginObject = {
      email,
      password
    };
    
    const customerObject = {
      customer_id: newCustomerId,
      customer_email: email,
      customer_fullname: '',
      customer_phone: '',
      customer_address: '',
      customer_city: '',
      customer_country: '',
      customer_zipcode: ''
    };

    // Append the login data to login.json file
    loginData.push(loginObject);
    fs.writeFile(path.join(folderPath,'login.json'), JSON.stringify(loginData, null, 2), {encoding:'utf8', flag:'w+'}, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    // Append the customer data to customer.json file
    customerData.push(customerObject);
    fs.writeFile(path.join(folderPath,'customer.json'), JSON.stringify(customerData, null, 2), {encoding:'utf8', flag:'w+'}, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.json({ isRegistered: true });
    console.log('Registration successful');
  }
});






/* =============== account edit request =============== */



app.post('/saveEdit', encoder, function(req, res){
  var email = req.body.email;
  var fullName = req.body.fullName;
  var phone = req.body.phone;
  var address = req.body.address;
  var city = req.body.city;
  var country = req.body.country;
  var zipCode = req.body.zipCode;



  console.log('zipCode: ', zipCode, ' and phone: ', phone);

  // Read the existing customer data from the file
  const rawData = fs.readFileSync(path.join(folderPath,'customer.json'));
  const customerData = JSON.parse(rawData);

  // Find the customer with the specified email
  const customer = customerData.find(c => c.customer_email === email);

  if (customer) {
    // Update the customer fields
    customer.customer_fullname = fullName || customer.customer_fullname;
    customer.customer_phone = phone || customer.customer_phone;
    customer.customer_address = address || customer.customer_address;
    customer.customer_city = city || customer.customer_city;
    customer.customer_country = country || customer.customer_country;
    customer.customer_zipcode = zipCode || customer.customer_zipcode;

    // console.log('zip ', customer.customer_zipcode);

    // Write the updated customer data back to the file
    fs.writeFile(path.join(folderPath,'customer.json'), JSON.stringify(customerData, null, 2), {encoding:'utf8', flag:'w+'}, (err) => {
      if (err) {
        console.error(err);
        res.json({ isSaved: false, message: 'Error saving customer data' });
        return;
      }
      // Read the updated customer data from the file
      const updatedRawData = fs.readFileSync(path.join(folderPath,'customer.json'));
      const updatedCustomerData = JSON.parse(updatedRawData);
      const updatedCustomer = updatedCustomerData.find(c => c.customer_email === email);

      res.json({ isSaved: true, 
        
        customer_email: updatedCustomer.customer_email,
        customer_fullname: updatedCustomer.customer_fullname,
        customer_phone: updatedCustomer.customer_phone,
        customer_address: updatedCustomer.customer_address,
        customer_city: updatedCustomer.customer_city,
        customer_country: updatedCustomer.customer_country,
        customer_zipcode: updatedCustomer.customer_zipcode
      });
      console.log('Update successful');
    });
  } else {
    res.json({ isSaved: false, message: 'Customer not found' });
  }
});




/* =============== PRODUCT MENU =============== */



app.get('/search', (req, res) => {
  const searchQuery = req.query.q.toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchQuery);
  });
  res.json(filteredProducts);
});

app.post('/cart', (req, res) => {
  const selectedProduct = req.body;
  const cart = JSON.parse(fs.readFileSync(path.join(folderPath,'cart.json')));
  const index = cart.findIndex(product => product.name === selectedProduct.name);

  if (index >= 0) {
    // If the product is already in the cart, increment its quantity
    cart[index].quantity++;
  } else {
    // Otherwise, add the product to the cart with a quantity of 1
    cart.push({...selectedProduct, quantity: 1});
  }

  fs.writeFileSync(path.join(folderPath,'cart.json'), JSON.stringify(cart, null, 2));
  res.json(cart);
});


/* =============== PRODUCT Cart =============== */  


app.get('/cart', (req, res) => {
  const cartData = fs.readFileSync(path.join(folderPath,'cart.json'));
  console.log('cart cart>>>>>>>>')
  // parse the JSON data and send it as a response
  const cartItems = JSON.parse(cartData);
  res.json(cartItems);
});



/* =============== PRODUCT Cart UPDATE ITEMS=============== */

app.put('/api/cart/:itemName', (req, res) => {
  const itemName = req.params.itemName;
  const itemQuantity = req.body.quantity;

  // Read the cart data from cart.json
  const cartData = fs.readFileSync(path.join(folderPath, 'cart.json'), 'utf-8');
  let cartItems = JSON.parse(cartData);

  // Update the quantity of the cart item with the matching name
  cartItems = cartItems.map(item => {
    if (item.name === itemName) {
      item.quantity = itemQuantity;
    }
    return item;
  });

  // Save the updated cart data to cart.json
  fs.writeFileSync(path.join(folderPath, 'cart.json'), JSON.stringify(cartItems, null, 2));

  // Send the updated cart items as a response
  res.json(cartItems);
});

/* =============== PRODUCT Cart DELETE ITEMS=============== */



app.post("/delete", (req, res) => {
  const productName = req.body.productName;

  console.log('productName to delete: ', productName);

  fs.readFile(path.join(folderPath, 'cart.json'), (err, data) => {
    if (err) throw err;

    const cart = JSON.parse(data);

    // Filter out the object(s) with a matching productName value
    const updatedCart = cart.filter((item) => item.name !== productName);

    fs.writeFile(path.join(folderPath, 'cart.json'), JSON.stringify(updatedCart, null, 2), (err) => {
      if (err) throw err;

      res.send({ success: true });
    });
  });
});


/* =============== PAYMENT CART -> ORDER =============== */



app.get('/order', (req, res) => {
  
  const cartFilePath = path.join(path.join(folderPath,'cart.json'));
  const orderFilePath = path.join(path.join(folderPath,'order.json'));

  // read the cart data from cart.json
  const cartData = fs.readFileSync(cartFilePath);
  const cartItems = JSON.parse(cartData);

  // read the existing order data from order.json, or create an empty array if the file does not exist
  let orderData = [];
  if (fs.existsSync(orderFilePath)) {
    const orderFileData = fs.readFileSync(orderFilePath);
    orderData = JSON.parse(orderFileData);
  }

  // append the cart data to the order data
  orderData.push(...cartItems);

  // write the combined data to order.json
  fs.writeFileSync(orderFilePath, JSON.stringify(orderData, null, 2));

  // clear the cart data by writing an empty array to cart.json
  fs.writeFileSync(cartFilePath, JSON.stringify([]));

  // send the cart data as a response
  res.json(cartItems);
});