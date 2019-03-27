// Require mysql and inquirer; mysql as database and inquirer for prompt
var mysql = require("mysql");
var inquirer = require("inquirer");
// Global variable representing user choice which will be updated 
var chosenItem;
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
                    // If user enters either q or Q, then end prompt
                    if (answer.itemId === "q" || answer.itemId === "Q") {
                        connection.end();
                    }
                    // Otherwise, prompt user of choice
                    else {
                        console.log("You chose item: " + answer.itemId);
                        var chosenItem = answer.itemId - 1;
                        // Call on function quantity, which is to be created and will ask how much of item chosen that user would like to buy
                        quantity();
                    }
                })
            // Create function for quantity, which will need:
            function quantity() {
                // Inquirer prompt asking how much quantity user would like to purchase, then test for q/Q input to quit
                inquirer.prompt({
                    name: "purchase",
                    message: "How much of the product would you like? [You can press Q to exit LOL]",
                    type: "input",
                }).then(function (bam) {
                    if (bam.purchase === "q" || bam.purchase === "Q") {
                        connection.end();
                    }
                    else {
                        connection.query("SELECT * FROM products", function (err, response) {
                           