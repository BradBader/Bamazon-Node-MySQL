var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require("table");
var productsArray = [];
var purchaseOption;
var purchaseOptionName;
var purchaseQuantity;
var availableQuantity;
var updatedQuantity;
var newSales = 0;
var productSales;
var currentSale =0;
var data = [
    ["Item ID", "Item Name", "Cost"]
];
var items = 0;

var totalSpent = 0;

var output = table(data)
// console.log(output);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    console.log("Congratulations, you are connected to Bradazon.  You are shopper number: " + connection.threadId);
    if (err) throw err;
    displayInventory();
    // started();
});

function displayInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {

            data.push([results[i].id, results[i].product_name, ("$" + results[i].price)])
        }
        items = results.length;
        var output = table(data)
        console.log(output);
        makePurchase();
    })



}

function makePurchase() {
    inquirer.prompt([
        {
            name: "purchase",
            type: "input",
            message: "Enter the ID of the item you would like to purchase:",
            validate: function (value) {
                if (isNaN(value) === false && value <= items) {
                    return true;
                }
                return false
            }

        }]).then(function (answer) {
            purchaseOption = parseInt(answer.purchase);
            getFullId();
        })
}


function getFullId() {
    connection.query("SELECT * FROM products WHERE ?", {
        id: purchaseOption
    }, function (err, result) {
        if (err) throw err;
        purchaseOptionName = result[0].product_name;
        availableQuantity = result[0].stock_quantity;
        currentPrice = result[0].price;
        productSales = result[0].product_sales;
        inquirer.prompt({
            name: "quantity",
            type: "input",
            message: "How many " + purchaseOptionName + " would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } return false;
            }
        }).then(function (answer) {
            purchaseQuantity = answer.quantity;
            quantityUpdate()
        })
    })
}
function quantityUpdate() {
    if ((availableQuantity - purchaseQuantity) >= 0) {
        currentSale = ((parseFloat(currentPrice).toFixed(2)) * (parseFloat(purchaseQuantity).toFixed(2)))
        updatedQuantity = (availableQuantity - purchaseQuantity)
        totalSpent = totalSpent + currentSale;
        newSales = (productSales + currentSale);
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: updatedQuantity,
            product_sales: newSales,
        }, {
            id: purchaseOption
        }],
            function (err, result) {
                if (err) throw err
                
                console.log("(" + purchaseQuantity + ") " + purchaseOptionName + " Successfully Purchased!\nThat set you back $" + (currentSale) + "!");
                availableQuantity = updatedQuantity;
                // console.log("There are " + availableQuantity + " of " + purchaseOptionName + " remaining!")
                purchasePower()
            })
    } else {
        console.log("There are not enough of " + purchaseOptionName + " remaining for you to make that purchase.")
        purchasePower();
    }

}

function purchasePower() {
    inquirer.prompt({
        name: "choice",
        type: "rawlist",
        choices: ["YES", "NO"],
        message: 'Would you like to make another purchase?'
    }).then(function (answer) {
        if (answer.choice == "YES") {
            displayInventory();
        } else {doneBuying();
        }
    })
}

function doneBuying() {
    if (totalSpent < 200) {
        console.log("You spent a total of $" + totalSpent + " today, not too bad!");
        connection.end();
    } else {
        console.log("You spent over $" + totalSpent + " today, that's daycare money!");
        connection.end();
    }
}







