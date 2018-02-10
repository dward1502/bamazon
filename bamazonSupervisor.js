var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
    head: ['department_ID', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
    colWidths: [10, 20, 20, 20, 20]
});

//connecting to mysqlDB b/amazonDB

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id : " + connection.thread + "\n");
    displayProductList();
});

