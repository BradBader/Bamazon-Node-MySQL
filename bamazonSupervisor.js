var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require("table");
var productsArray = [];
var addIDOption;
var purchaseOptionName;
var purchaseQuantity;
var availableQuantity;
var additionalQuantity;
var updatedQuantity;
var totalSpent = 0;
var inventoryDisplayed = false;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    console.log("Congratulations, you are connected to Bradazon with supervisor privileges!");
    if (err) throw err;
    initialChoice();
    // started();
});

function initialChoice() {
    inquirer.prompt({
        name: "choice",
        type: "rawlist",
        choices: ["View product sales by department", "Create New Department", "Exit"],
        message: 'What would you like to do?'
    }).then(function (answer) {
        switch (answer.choice) {
            case "View product sales by department":
                displayDepts();
                break;

            case "Create New Department":
                lowInventory()
                break;

            case "Exit":
                done();
                break;
        }
    })
}

function displayDepts() {
    var data = [
        ["Item ID", "Item Name", "Cost", "Quantity"]
    ];
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {


            data.push([results[i].id, results[i].product_name, ("$" + results[i].price), results[i].stock_quantity])

        }
        var output = table(data)
        console.log(output);
        inventoryDisplayed = true;
        initialChoice();

    })
}

function lowInventory() {
    var k = 0;
    var data = [
        ["Item ID", "Item Name", "Quantity In Stock"]
    ];
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {
            if (results[i].stock_quantity <= 5) {

                data.push([results[i].id, results[i].product_name, results[i].stock_quantity])
                k++;
            }

        }
        var output = table(data)
        if (k >= 1) {
            console.log(output);
        } else {
            console.log("All of your products are well stocked, great job!")
        }
        inventoryDisplayed = true;
        initialChoice();

    })
}

function getFullId() {
    connection.query("SELECT * FROM products WHERE ?", {
        id: addIDOption
    }, function (err, result) {
        if (err) throw err;
        purchaseOptionName = result[0].product_name;
        availableQuantity = parseFloat(result[0].stock_quantity);
        currentPrice = result[0].price;
        inquirer.prompt({
            name: "quantity",
            type: "input",
            message: "How many " + purchaseOptionName + " would you like to add to inventory?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } return false;
            }
        }).then(function (answer) {
            additionalQuantity = parseFloat(answer.quantity);
            console.log("You have chose to add " + additionalQuantity)
            quantityUpdate()
        })
    })
}

function addInventory() {
    // if (inventoryDisplayed === false) {
    //     displayInventory();
    // }

    inquirer.prompt({
        name: "ID",
        type: "input",
        message: "Enter the ID of the item you would like to replenish: ",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            } return false;
        }
    }).then(function (answer) {
        addIDOption = answer.ID;
        console.log(addIDOption)
        inventoryDisplayed = false;
        getFullId();
    })
}

function quantityUpdate() {
    updatedQuantity = (availableQuantity + additionalQuantity)
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: updatedQuantity
    }, {
        id: addIDOption
    }],
        function (err, result) {
            if (err) throw err

            console.log("There are now " + updatedQuantity + " " + purchaseOptionName + " available to customers.");
            availableQuantity = updatedQuantity;

            initialChoice()
        })
}

var newProduct = function () {
    inquirer.prompt([{
        name: 'product',
        type: 'input',
        message: 'What is the name of the new product?'
    }, {
        name: 'department',
        type: 'input',
        message: 'What department will this product be in?'
    }, {
        name: 'price',
        type: 'input',
        message: 'What is the price of this product?',
        validate: function (value) {
            if (isNaN(value) == false) {
                return true
            } else {
                return false;
            }
        }
    }, {
        name: 'quantity',
        type: 'input',
        message: 'How many of this product are you adding?',
        validate: function (value) {
            if (isNaN(value) == false) {
                return true
            } else {
                return false;
            }
        }
    }
    ]).then(function (answer) {
        connection.query('INSERT INTO products SET ?', {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }, function (err, res) {
            if (answer.quantity == 1) {
                console.log(answer.quantity + " " + answer.product + " at " + answer.price + " was successfully added to the store.");
            } else if (answer.quantity >= 2) {
                 console.log(answer.quantity + " " + answer.product + " at " + answer.price + " were successfully added to the store.");
            } else if (answer.quantity == 0) {
                console.log("You didn't add anything!")
            }
            if (err) throw err;
            initialChoice();
        })
    })
};

function done() {
    console.log("Have a great day!")
    connection.end();
}

