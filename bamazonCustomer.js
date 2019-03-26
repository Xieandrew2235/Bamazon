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
    // Run the start function below after the connection is made to prompt the user
    start();
});
// Start function which will prompt user with questions, and .then for what happens based on user response input
function start() {
    inquirer
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
        )
}
// To display mySQL data on bash, we need to 
// 1. Select * from table, function, if (err) throw err
// Run for loop and console log name price etc?