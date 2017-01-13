var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "M3605416octo",
    database: "bamazon",
});

try {
    connection.connect(function(err) {
        if (err)
            throw err;
        console.log("connection as id: " + connection.threadId);
        runCode();
        connection.close
    });
} catch (err) {
    console.log("Exception caught: " + err);
}

function runCode() {
    //testQuery_01();
    //testQuery_02();
    // testQuery_03();
    // testQuery_04();
    // testQuery_05();
    // testQuery_06();
    // testQuery_07();
    testQuery_09();
    connection.end();
}

var BEGINLABEL = 'BEGIN QUERY ';
var ENDLABEL = 'END QUERY ';

function testQuery_01() {
    console.log(BEGINLABEL);
    var query = "SELECT * FROM products WHERE stock_quantity>0";
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    console.log(ENDLABEL);
}

function testQuery_02() {
    console.log(BEGINLABEL);
    var item_id = 6;
    var query = "SELECT * FROM products WHERE item_id=?";
    connection.query(query, [item_id], function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    console.log(ENDLABEL);
}

function testQuery_03() {
    console.log(BEGINLABEL);
    var quantitiy_purchased = 1;
    var item_id = 6;
    var query = "UPDATE products SET stock_quantity=stock_quantity-? WHERE item_id=?";
    connection.query(query, [quantitiy_purchased, item_id], function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    console.log(ENDLABEL);
}

function testQuery_04() {
    console.log(BEGINLABEL);
    var query = "SELECT * FROM manager_products_for_sale";
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    console.log(ENDLABEL);
}

function testQuery_05() {
    console.log(BEGINLABEL);
    var query = "SELECT * FROM manager_low_inventory;";
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    console.log(ENDLABEL);
}

function testQuery_06() {
    console.log(BEGINLABEL);
    var item_id = 6;
    var quantitiy_added = 1;
    var query = "UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id=?";
    connection.query(query, [quantitiy_added, item_id], function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    console.log(ENDLABEL);
}

function testQuery_07() {
    console.log(BEGINLABEL);
    var department_name = "Books";
    var product_name = "Test Book 1";
    var price = 80.0;
    var stock_quantity = 12;
    var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?);";
    connection.query(query, [product_name, department_name, price, stock_quantity], function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    console.log(ENDLABEL);
}

function testQuery_09() {
    console.log(BEGINLABEL + ' 09');

    var items_count = 2;
    var item_id = 6;
    var department_id = 0;
    var department_name = "";
    var total_sale = 0;

    var query1 = "UPDATE products SET stock_quantity=stock_quantity-?, product_sales=product_sales+(price*?) WHERE item_id=?";
    var query11 = "SELECT * FROM products WHERE item_id=?";
    var query12 = "SELECT department_id FROM departments WHERE department_name=(SELECT department_name from products where item_id=?)";
    var query3 = "UPDATE departments SET total_sales=total_sales+? WHERE department_id=?";

    connection.query(query1, [items_count, items_count, item_id], function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });
    // SET total_sale and department_name
    connection.query(query11, [item_id], function(err, res) {
        if (err)
            throw err;
        // set total_sale here
        total_sale = items_count * res[0].price;
        console.log(typeof total_sale);
        console.log("total_sale="+total_sale);
        // set department_name here
        department_name = res[0].department_name;
        console.log("department_name="+department_name);
    });
    connection.query(query12, [item_id], function(err, res) {
        if (err)
            throw err;
        // set department_id here
        department_id = parseInt(res[0].department_id);
        console.log(typeof department_id);
        console.log("department_id="+department_id);
    });

    connection.query(query3, [total_sale, department_id], function(err, res) {
        if (err)
            throw err;
        console.log(res);
    });


    /*
    connection.query2(query, [item_id], function(err, res) {
        if (err)
            throw err;
        // set department_name here
        console.log(res);
    });

    */

    console.log(ENDLABEL + ' 08');
}

function testQuery_10() {
    console.log(BEGINLABEL);
    var query = "";
    console.log(ENDLABEL);
}