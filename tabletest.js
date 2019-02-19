var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require("table");
var productsArray = [];
var purchaseOption;
var purchaseOptionName;
var purchaseQuantity;
var availableQuantity;
var updatedQuantity;

var data = [
    ["name", "job", "things"]
];

data.push(["bob", "bootlicker", "RDR2"])

var output = table(data)
console.log(output);