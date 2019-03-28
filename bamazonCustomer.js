// Require mysql and inquirer; mysql as database and inquirer for prompt
var mysql = require("mysql");
var inquirer = require("inquirer");

// Establish connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // Run the start and viewTable functions below after the connection is made to prompt the user and display items for sale
    viewTable();
});
// Global variable representing user choice which will be updated 
var chosenItem;
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
                        chosenItem = answer.itemId - 1;
                        // Call on function quantity, which is to be created and will ask how much of item chosen that user would like to buy
                        quantity();
                    }
                })
            // Create function for quantity, which will need:
            function quantity() {
                // Inquirer prompt asking how much quantity user would like to purchase, then test for q/Q input to quit
                inquirer.prompt({
                    name: "action",
                    message: "How much of the product would you like? [You can press Q to exit LOL]",
                    type: "input",
                    validate: function (value) {
                        if (value === "") {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    // If user enters either "q" or "Q", end connection
                }).then(function (res) {
                    if (res.action === "q" || res.action === "Q") {
                        connection.end();
                    }
                    else {
                        connection.query("SELECT * FROM products", function (err, response) {
                            // Check user quantity with # of quantity available
                            // Sale either goes thru/returns error, both in console log
                            if ((response[chosenItem].stock_quantity - res.action) < 0) {
                                console.log("We don't have enuffa that!");
                                start();
                            }
                            else {
                                console.log("Thank you for your purchase! You have bought " + res.action + " " + response[chosenItem].product_name + " for $" + (res.action * response[chosenItem].price + ". Hope to see you again soon!"));
                                 // Console log total price and update DB (look into SQL Update Statement)
                                 var changeQuantity = response[chosenItem].stock_quantity - res.action;
                                 var query = connection.query("UPDATE products SET ? WHERE ?",
                                     [
                                         {
                                             stock_quantity: changeQuantity
                                         },
                                         {
                                             id: chosenItem + 1
                                         }
                                     ],
                                    //  Calls on viewTable function again to restart so that user can make another purchase
                                     function (err, res) {
                                         viewTable();
                                     }
                                 );
                             }
                         })
                     }
                 }
 
                 )
             }
         }
     })
 } 