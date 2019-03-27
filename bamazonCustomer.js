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
var viewTable = function () {
    // Connect to query, and then selects table "products" and loops through the created items, and returns them in a table
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("| " + results[i].id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity + " |");
        }
        order();
    })
};

// Start function which will prompt user with questions, and .then for what happens based on user response input
var order = function () {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err; {
            inquirer
                // Prompt
                .prompt({
                    name: "itemId",
                    type: "input",
                    message: "What is the ID number of the item you would like to bid on?",
                })
                .then(function (answer) {
                    // .then for response after getting user input
                    var chosenItem;
                    // Loop through results and create if statement: if user input matches ID of item for sale, then the variable chosenItem will equal to result[i] (whichever ID number user enters)
                    for (var i = 0; i < results.length; i++) {
                        // Use parseInt for integer?
                        if (parseInt(results[i].id) === parseInt(answer.choice)) {
                            chosenItem = results[i];
                }
                    // Check if user-entered quantity is greater than or equal to quantity available?
                    // Which means we need a variable for the new quantity//find a way to update quantity on DB
                    }
                    // If enough quantity then sale goes through
                }
                // If sale does not go through, which would be our else statement. Console log.
        else {
    console.log("Sorry, we don't have enough in stock! Please enter a smaller amount and try again");
    }
