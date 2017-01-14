/* QUERIES */
USE bamazon

SHOW TABLES;
SHOW COLUMNS FROM products;
SHOW COLUMNS FROM departments;


/* QUERY 1 */
SELECT * FROM products WHERE stock_quantity>0;

/* QUERY 2 */
SELECT * FROM products WHERE item_id=6;

/* QUERY 3 */
/* DECREMENT INVENTORY */
UPDATE products SET stock_quantity=stock_quantity-1 WHERE item_id=6;

/* QUERY 4 */
/* Show all fields except department_name*/
SELECT * FROM manager_products_for_sale;

/* QUERY 5 */
SELECT * FROM manager_low_inventory;

/* QUERY 6 */
/* UPDATE INVENTORY */
UPDATE products SET stock_quantity=stock_quantity+10 WHERE item_id=5;

/* QUERY 7 */
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Books", "Database Management Systems and Design ", 80.00, 12);

/* QUERY 8 */
/* ALTER TABLE products ADD product_sales DECIMAL(10,2) DEFAULT 0; */
/* Possibly trigger addition of price on decrement of stock_quantity*/


SELECT * FROM products

/* QUERY 9 - QUERY 3 REPLACE*/
UPDATE products SET stock_quantity=stock_quantity-2, product_sales=product_sales+(price*2) WHERE item_id=6;
SELECT * FROM products  WHERE item_id=6; 
SELECT department_name from products where item_id=6;
UPDATE departments SET total_sales=total_sales+8888 WHERE department_name=();

SELECT * FROM departments
/*EXPERIMENT TABLE DESIGN FLAW*/
/* SAFE UPDATE MODE MUST BE TURNED OFF TO USE THE FOLLOWING*/
UPDATE departments 
SET total_sales=total_sales+8888 
WHERE department_name=(SELECT department_name from products where item_id=6);

SELECT department_id FROM departments WHERE department_name=(SELECT department_name from products where item_id = 6);

UPDATE departments 
SET departments.total_sales=departments.total_sales+8888 
WHERE department_id=1;
/*
UPDATE departments 
SET total_sales=total_sales+8888 
WHERE department_id=(SELECT department_id FROM departments WHERE department_name="Books");
*/

/* QUERY 10 */
/* Show all fields except department_name*/
CREATE VIEW manager_product_sales_by_department AS
SELECT item_id, product_name, price, stock_quantity FROM products ORDER BY item_id;
SELECT * FROM manager_products_for_sale;

SELECT * FROM departments
SELECT * FROM products

SELECT department_id, department_name, (total_sales-over_head_costs) AS total_profit 
FROM departments;




