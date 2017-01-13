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
        getManagerOptions();
    });
} catch (err) {
    console.log("Exception caught: " + err);
}

var getManagerOptions = function() {
    var choice_questions = [{
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["View Products Sales by Department",
            "Create New Department"
        ]
    }];
    var new_product_questions = [{
        type: "input",
        message: "What is the product name?",
        name: "product_name"
    }, {
        type: "input",
        message: "What department name?",
        name: "department_name"
    }, {
        type: "input",
        message: "What will be the price?",
        name: "price"
    }, {
        type: "input",
        message: "What quantity will be in stock?",
        name: "stock_quantity"
    }];
    var add_inventory_questions = [{
        type: "input",
        message: "What is the item id ?",
        name: "item_id"
    }, {
        type: "input",
        message: "How many to add to inventory?",
        name: "quantity"
    }];

    inquirer.prompt(choice_questions).then(function(user) {
        switch (user.choice) {
            case "View Products for Sale":
                {
                    var query1 = "SELECT * FROM products";
                    connection.query(query1, function(err, res) {
                        if (err) {
                            throw err;
                        }
                        printProducts(res);
                        connection.end();
                    });
                    break;
                }
            case "View Low Inventory":
                {
                    var query2 = "SELECT * FROM manager_low_inventory;";
                    connection.query(query2, function(err, res) {
                        if (err) {
                            throw err;
                        }
                        printProducts(res);
                        connection.end();
                    });
                    break;
                }
            case "Add to Inventory":
                {
                    inquirer.prompt(add_inventory_questions).then(function(inv) {
                        var query3 = "UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id=?";
                        connection.query(query3, [inv.quantity, inv.item_id], function(err, res) {
                            if (err) {
                                throw err;
                            }
                            var query4 = "SELECT * FROM products";
                            connection.query(query4, function(err, res) {
                                if (err) {
                                    throw err;
                                }
                                printProducts(res);
                                connection.end();
                            });
                        });
                    });
                    break;
                }
            case "Add New Product":
                {
                    inquirer.prompt(new_product_questions).then(function(prod) {
                        var query5 = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?);";
                        connection.query(query5, [prod.product_name, prod.department_name, prod.price, prod.stock_quantity], function(err, res) {
                            if (err) {
                                throw err;
                            }
                            var query6 = "SELECT * FROM products";
                            connection.query(query6, function(err, res) {
                                if (err) {
                                    throw err;
                                }
                                printProducts(res);
                                connection.end();
                            });
                        });
                    });
                    break;
                }
            default:
                console.log("What am I doing here?");
        }
    });
};

function printProducts(res) {
    console.log("\n" + " ID  DEPT                                  PRODUCT NAME    PRICE STOCK    SALES");
    for (var i = 0; i < res.length; i++) {
        console.log(pad(res[i].item_id, 3) + // 3 chars
            pad(res[i].department_name, 6) + // 6 chars
            pad(res[i].product_name, 46) + // 48 chars
            ' $' + pad(res[i].price, 7) + " " + // 9 chars
            pad(res[i].stock_quantity, 5) + " "+
            pad(res[i].product_sales, 8)); // 5 chars
    }
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