var mysql = require('mysql');
var inquirer = require("inquirer");

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
        getPurchase();
    });
} catch (err) {
    console.log("Exception caught: " + err);
}

var getPurchase = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err)
            throw err;
        // Keep total chars/line < 80 
        for (var i = 0; i < res.length; i++) {
            console.log(pad(res[i].item_id, 3) + // 3 chars
                pad(res[i].department_name, 6) + // 6 chars
                pad(res[i].product_name, 46) + // 48 chars
                ' $' + pad(res[i].price, 5) + " (" + // 9 chars
                pad(res[i].stock_quantity, 4) + " available)"); // 15 chars
        }
        var questions = [{
            type: "input",
            message: "What number item do you wish to purchase?",
            name: "item_id"
        }, {
            type: "input",
            message: "How many do you wish to purchase?",
            name: "quantity"
        }];
        inquirer.prompt(questions).then(function(user) {
            var department_name = '';
            var total_sale = 0;

            // Check quantities avaliable to see if we can proceed with purchase
            var proceed = false;
            for (var i = 0; i < res.length; i++) {
                // if(LS string  RS number)
                if (user.item_id == res[i].item_id && user.quantity <= res[i].stock_quantity) {
                    // need department name for next query
                    department_name = res[i].department_name;
                    total_sale = user.quantity * res[i].price;
                    proceed = true;
                }
            }
            if (proceed) {
                var department_id = 0;
                // Update the stock quantity in the products table.
                var query1 = "UPDATE products SET stock_quantity=stock_quantity-? WHERE item_id=?";
                connection.query(query1, [user.quantity, user.item_id], function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // If we successfully changed a row.
                    if (res.changedRows === 1) {
                        // Set department_id by department name
                        var query2 = "SELECT department_id FROM departments WHERE department_name=?";
                        connection.query(query2, [department_name], function(err, res) {
                            if (err) {
                                throw err;
                            } else {
                                department_id = res[0].department_id;
                                // UPDATE total_sales in departments table
                                var query3 = "UPDATE departments SET total_sales=total_sales+? WHERE department_id=?";
                                connection.query(query3, [total_sale, department_id], function(err, res) {
                                    if (err) {
                                        throw err;
                                    }
                                    if (res.changedRows === 1) {
                                        console.log("Updated departments total_sales");
                                        queryShowProducts();
                                        queryShowDepartments();
                                        connection.end();
                                    }
                                    else {
                                        throw("ROW DID NOT CHANGE Update departments total_sales");
                                    }
                                });
                            }
                        });
                    } else {
                        throw "Failed to update stock_quantity in products table";
                    }
                });
            } else {
                console.log("Insufficient quantities in stock!");
                getPurchase();
            }
        });
    });
};

function queryShowProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        // Keep total chars/line < 80 
        for (var i = 0; i < res.length; i++) {
            console.log(pad(res[i].item_id, 3) + // 3 chars
                pad(res[i].department_name, 6) + // 6 chars
                pad(res[i].product_name, 46) + // 48 chars
                ' $' + pad(res[i].price, 5) + " (" + // 9 chars
                pad(res[i].stock_quantity, 4) + " available)"); // 15 chars
        }
    });
}

function queryShowDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, function(err, res) {
        if (err)
            throw err;
        // Keep total chars/line < 80 
        console.log("\n" + " dept id                       dept name  oh costs tot sales");
        for (var i = 0; i < res.length; i++) {
            console.log(pad(res[i].department_id, 8) + // 3 chars
                pad(res[i].department_name, 32) + // 6 chars
                ' $' + pad(res[i].over_head_costs, 8) + // 8 chars
                ' $' + pad(res[i].total_sales, 8)); // 9 chars
        }
    });
}
// pad (prepend) a number or string with spaces
// v -value (number or string)
// w -width
function pad(v, w) {
    for (var ret = ''; ret.length < w; ret += ' ');
    // ret a string
    // if v a string ok, if v a number coercion to string
    return (ret + v).slice(-w);
}