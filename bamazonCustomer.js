var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var Colors = require('colors');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "pointers619!",
    database: "bamazon_DB",
    charset: 'utf8'
});
//instantiate table 
var table = new Table({
    head: ['ID','Product','Department','Price','Stock'],
    colWidths:[10,20,20,20,20]
});

//connecting to mysqlDB b/amazonDB

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id : " + connection.thread + "\n");
    displayProductList();
});


function displayProductList(){
    let sql = 'SELECT * FROM products WHERE item_id BETWEEN 1 AND 10';
    
    connection.query(sql, (err,res,cols)=>{
        if(err) throw err;
        console.log("\nItems for sale on Dan's bamazon : ");

        for(var i = 0; i < res.length ; i ++){
             table.push(
                 [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
             );        
        }
        console.log(table.toString());
        customerChoice();
    });
}

function customerChoice(){
    console.log("\nTime to hand over your money...");
    inquirer.prompt([{        
        name: "product",        
        message: "What product would you like to buy? Pick an ID below...",
        type: "list",
        choices: ["1","2","3","4","5","6","7","8","9","10"]
    },{
        name: "unit",
        message: "How many units of the product would you like to buy?"
    }
    ]).then(function(answers){
        let productID = answers.product;
        let unitAmt = answers.unit;
        console.log("\nThis is the product ID : " + productID);
        console.log("This is how many units you want to buy : " + unitAmt);

        searchProducts(productID, unitAmt);
       
    });
}
function searchProducts(productID, unitAmt){
    let sql = "SELECT product_name, stock_quantity, price FROM products WHERE ?";
    
    connection.query(sql, {item_id: productID}, function(err,res){

        let existingAmt = res[0].stock_quantity;
        let unitPrice = res[0].price;

        if(unitAmt > existingAmt){
           console.log("The " + res[0].product_name + " product is in Insufficient quantity!");
           console.log("Thank you come again... ");
           displayProductList();
        }else{
            updateProducts(unitAmt, existingAmt, productID, unitPrice);

        }
    });
    
}
function  updateProducts(unitAmt,existingAmt,productID,unitPrice) {
    console.log("Submitting your order...");
    let newAmt = (existingAmt-unitAmt);
    let customerPrice = (unitAmt * unitPrice);
    
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newAmt
          },
          {
            item_id: productID
          },
          {
            product_sales: customerPrice
          }
        ], function(err,res){
            if (err) throw err;
            console.log("=============================")
            console.log("Order has been processed...");
            console.log("This is how much you paid for the product $ " + customerPrice);
            console.log("The amount left of the product " + newAmt);
        }
    );
    
    connection.end();
}

