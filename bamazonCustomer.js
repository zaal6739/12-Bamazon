var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8000,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;//throw an error

    console.log('connected as id '+connection.threadId+'\n')//show connected
    
    displayAllItems();//move on to first function
  });

  function displayAllItems() {

    connection.query('select * from bamazon.products', function(err,res) {
      if (err) throw err;

      var arrayLength = res.length;

    for (var j = 0; j < arrayLength; j++) {
    //displays what is for sale
    console.log('---------------------------\n')
    console.log('Product ID: ' + res[j].item_id);
    console.log('Product Name: ' + res[j].product_name);
    console.log('Product Price: ' + res[j].price+'\n');
    }  
     
    connection.end();

    })
  }