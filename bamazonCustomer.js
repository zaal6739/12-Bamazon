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
    console.log('---------------------------')
    console.log('Product ID: ' + res[j].item_id+' Product Name: ' + res[j].product_name + ' Product Price: ' + res[j].price);
    }  
     
//    connection.end();
console.log('hit the arrow key for prompts');
    })
    userInput()
  }

  function userInput() {
    inquirer.prompt([
      {
        name: 'itemID',
        type: 'input',
        message:'What is the ID of the item you would like to purchase?'
      },
      {
        name:'quantity',
        type:'input',
        message: 'How many items would you like to purchase?'
      },
    ]).then(function(answers) {
     
     var requestedID = answers.itemID;
     var requestedQuantity = answers.quantity;
     
     productsPurchased(requestedID,requestedQuantity);
    })

  }

  function productsPurchased(requestedID,requestedQuantity) {
    connection.query(
      "select * from bamazon.products where ?",
      {
        item_id: requestedID
      },
      function(err,res) {
        if (err) throw err;
       
        if (requestedQuantity > res.stock_quantity)
        {
          console.log('Sorry, out of stock.  There are only '+res.stock_quantity+'items left!');
        } 
        else 
        {
          console.log ('Your item is still in stock!');

          connection.query('UPDATE products set stock_quantity = stock_quantity - '+requestedQuantity+' where item_id ='+requestedID);
         
          var totalCost = res[0].price * requestedQuantity;

          console.log('Your total cost is: '+ totalCost);

        }
     })
 
  }