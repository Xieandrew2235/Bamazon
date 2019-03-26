// Require mysql and inquirer; mysql as database and inquirer for prompt
var mysql = require("mysql");
var inquirer = require("inquirer");
// Establish connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1win2lose",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // Run the start and viewTable functions below after the connection is made to prompt the user and display items for sale
    viewTable();
});
// Creating a variable viewTable which will display the data stored in the products table in SQL
var viewTable = function (){
    // Connect to query, and then selects table "products" and loops through the created items, and returns them in a table
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("| " + results[i].id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity +" |");
        }
        order();
    });

// Start function which will prompt user with questions, and .then for what happens based on user response input
var order = function () {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err; {
    inquirer
    // Prompt
        .prompt({
            name: "itemId",
            type: "input",
            message: "What is the ID number of the item you would like to bid on?",
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.itemId === "") {
                // insert function();

            }
        }
        )}})
    }}

// To display mySQL data on bash, we need to
// 1. Select * from table, function, if (err) throw err
