CREATE DATABASE Bamazon;

use Bamazon;

DROP table products;
CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(250) NOT NULL,
    department_name VARCHAR(250) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(16) NOT NULL,
    PRIMARY KEY (item_id)
);

DROP table departments;
CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(250) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    total_sales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO products (department_name, product_name, price, stock_quantity) VALUES 
("Books", "You Don't Know JS: Up & Going ", 8.25, 45),
("Books", "You Don't Know JS: Up & Going", 4.99, 16),
("Books", "The Principles of Object-Oriented JavaScript", 16.46, 3),
("Books", "You Don't Know JS: Scope & Closures", 6.79, 8),
("Books", "You Don't Know JS: ES6 & Beyond", 10.44, 103),
("Books", "You Don't Know JS: Async & Performance", 12.21, 37),
("Books", "You Don't Know JS: Types & Grammar ", 10.85, 12),
("Shoes", "New Balance Men's 623v3 Training Shoe", 49.95, 4),
("House", "50 O'Malley Washing Machine Lint Traps ", 23.95, 45),
("Gift", "Amazon Gift Card Christmas Tree", 100.00, 5);

INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES 
("Books", 6700, 0),
("Gift", 8500, 0),
("House", 9000, 0),
("Shoes", 7500, 0);

/* QUERY 4 */
/* Show all fields except department_name*/
/*DROP VIEW manager_products_for_sale;
CREATE VIEW manager_products_for_sale AS
SELECT item_id, product_name, price, stock_quantity FROM products ORDER BY item_id;
*/

/* QUERY 8 */ /**/
ALTER TABLE products ADD product_sales DECIMAL(10,2) DEFAULT 0;
/* Possibly trigger addition of price on decrement of stock_quantity*/

/* QUERY 5 */
DROP VIEW manager_low_inventory;
CREATE VIEW manager_low_inventory AS
SELECT * FROM products WHERE stock_quantity<5 ORDER BY stock_quantity;
