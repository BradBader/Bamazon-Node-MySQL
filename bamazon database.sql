DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
id INT PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(60) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price FLOAT(6, 2) NOT NULL,
stock_quantity INT(5) NOT NULL,
product_sales FLOAT(6, 2)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Comic Book Collection", "Books", 75.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One X", "Video Games", 400.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4 Pro", "Video Games", 400.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MySQL Tutorial", "Books", 40.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Horizon Zero Dawn GOTY", "Video Games" , 29.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Meat Smoker", "Cooking", 600.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Green Egg", "Cooking", 700.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grilling Utensils", "Cooking", 30.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Printer Paper (case)", "Office Supplies", 50.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Envelopes", "Office Supplies", 30.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sata 3 Cable 18-inch (3-Pk)", "Computer Peripherals", 6.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cable Wraps (3-pk)", "Computer Peripherals", 10.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AA Rechargeable Batteries (12-Pk)", "Batteries", 12.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon Prime Membership", "Retention", 129.99, 999);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air filter for YOUR car", "Automotive", 25.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Everything Beetles, by Noel Gallagher (Best Seller)", "Books", 35.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tribute, by Tenacious D MP3", "Music", 1.99, 999);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pizza Stone", "Cooking", 20.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Litter", "Pets", 10.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption 2 Play Guide", "Books", 20.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kratos & Atreus Art Scale 1/10 by Iron Studios", "Collectibles", 160.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Genosha X-Men Omnibus", "Comics", 55.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Magneto Omnibus", "Comics", 55.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batman: Damned (Hardcover) (Preorder)", "Comics", 55.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Dark Knight 4K (UHD) + Digital Copy", "Movies", 29.99, 10);

CREATE TABLE departments(
department_id INT PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(50) NOT NULL,
overhead_costs FLOAT(10,2) NOT NULL
);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Books", 10);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Video Games", 5);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Retention", 1);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Pets", 5);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Office Supplies", 3);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Music", 1);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Movies", 1);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Cooking", 3);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Computer Peripherals", 1);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Comics", 2);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Collectibles", 3);
INSERT INTO departments (department_name, overhead_costs)
VALUES ("Batteries", 4);

SELECT * FROM products

