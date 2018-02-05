var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Pointers619!",
    database: "bamazon_DB",
    charset: 'utf8'
});

//connecting to mysqlDB bamazonDB

connection.connect(function(err){
    if(err) throw err;
  //  console.log("connected as id : " + connection.thread + "\n");
    menu();

});

function menu(){
    console.log(" Hello manager welcome to Dan's bamazon menu options .... \n");
    inquirer.prompt([{
        name: "menu",
        message: "Pick an option below....",
        type: "list",
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
    }]).then(function(options){
        switch(options.menu){
            case "View Products for Sale":
                console.log("\n Dan's bamazon products for sale : \n");
                viewProducts();
            break;
            case "View Low Inventory":
                console.log("\n Dan's bamazon products with low inventory : \n");
                viewLowInventory();

            break;
            case "Add to Inventory":
                console.log("\n Add more inventory to an existing product in Dan's bamazon products : \n");
                    addInventory();
            break;
            case "Add New Product":
                console.log("\n Add a new product to Dan's bamazon products : \n");
                    addProduct();

            break;
            default:
            connection.end();
        }
    });
}

function viewProducts(){
    let sql = 'SELECT * FROM products ';
        
        connection.query(sql, (err,res,cols)=>{
            if(err) throw err;
            console.log("Items for sale on Dan's bamazon : ");

        // console.log(res);
            for(var i = 0; i < res.length ; i ++){
                console.log("-------------------------")
                console.log("ID : " + res[i].item_id);
                console.log("Product : " + res[i].product_name);
                console.log("Department :" + res[i].department_name);
                console.log("Price : " + res[i].price);
                console.log("Stock : " + res[i].stock_quantity);
            }
            connection.end();
        });
}
function viewLowInventory(){
    let query = "SELECT product_name FROM products GROUP BY stock_quantity < 10"
    connection.query(query, function(err,res){
       // console.log(res);
        for (var i = 0; i < res.length; i ++){
            console.log(res[i].product_name);
        }
    });
    connection.end();
}
function addInventory(){
    inquirer.prompt([{
        name: "product",        
        message: "What product would you like to add Inventory? Pick an ID below...",
        type: "list",
        choices: ["1","2","3","4","5","6","7","8","9","10"]
    },{
        name: "unit",
        message: " How many units of the product would you like to add?"
    }
    ]).then(function(answers){
        let productID = answers.product;
        let unitAmt = answers.unit;
        let sql = "SELECT product_name, stock_quantity, price FROM products WHERE ?";
        connection.query(sql, {item_id: productID}, function(err, res){
            let existingAmt = res[0].stock_quantity;
            let unitPrice = res[0].price;
            updateInventory(existingAmt, unitAmt,productID);
        });
    });
}
function updateInventory(existingAmt, unitAmt, productID){
        let newAmt = (existingAmt+unitAmt);        
        console.log("This is the existing amount of product ID " + productID + " : " + existingAmt);
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
            {
                stock_quantity: newAmt
            },
            {
                item_id: productID
            }
            ], function(err,res){
                if (err) throw err;
                console.log(" Order has been processed...");
                console.log(res.affectedRows + " Existing amount..")
            }
        );        
        console.log("The updated amount left of the product : " + newAmt);
        connection.end();
}
function addProduct(){
    console.log(" What type of products would you like to add to Dan's bamazon.");
    inquirer.prompt([{
        name: "product",
        message: "What is the name of the product you are adding?"
    },{
        name: "department",
        message: "What department would you like it to be in?"
    },{
        name: "price",
        message: "What is the price per unit of the product?"
    },{
        name: "stock",
        message: "How many units will you like to have on stock?"
    }
    ]).then(function(amswers){
        let product = answers.product;
        let department = answers.department;
        let price = answers.price;
        let stock = answers.stock;

        connection.query("INSERT INTO products SET ?",
        {
            product_name : product,
            department_name: department,
            price: price,
            stock_quantity: stock
        }, function(err, res){
            console.log( res.affectedRows + " products have been inserted!\n");
            }
        );
    });
    connection.end();
}
