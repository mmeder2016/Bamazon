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
            "View Total Profit",
            "Create New Department"
        ]
    }];
    var add_department_questions = [{
        type: "input",
        message: "What is the name of the department?",
        name: "department_name"
    }, {
        type: "input",
        message: "What are the overhead costs?",
        name: "over_head_costs"
    }];

    inquirer.prompt(choice_questions).then(function(user) {
        switch (user.choice) {

            case "View Products Sales by Department":
                {
                    var query1 = "SELECT * FROM departments";
                    connection.query(query1, function(err, res) {
                        if (err) {
                            throw err;
                        }
                        printDepartments(res);
                        connection.end();
                    });
                    break;
                }
            case "View Total Profit":
                {
                    var query3 = "SELECT department_id, department_name, (total_sales-over_head_costs) AS total_profit FROM departments;";
                    connection.query(query3, function(err, res) {
                        if (err) {
                            throw err;
                        }
                        printTotalProfit(res);
                        connection.end();
                    });
                    break;
                }
            case "Create New Department":
                {
                    inquirer.prompt(add_department_questions).then(function(dept) {
                        var query2 = "INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES (?,?,?)";
                        connection.query(query2, [dept.department_name, dept.over_head_costs, 0], function(err, res) {
                            if (err) {
                                throw err;
                            }
                            connection.end();
                        });
                    });
                    break;
                }
            default:
                console.log("What am I doing here?");
        }
    });
};

function printTotalProfit(res) {
    console.log("\n" + " DEPT ID DEPT NAME  TOT PROFIT");
    for (var i = 0; i < res.length; i++) {
        console.log(pad(res[i].department_id, 8) + // 3 chars
            pad(res[i].department_name, 10) + // 16 chars
            ' $' + pad(res[i].total_profit, 10)); // 9 chars
    }
}

function printDepartments(res) {
    console.log("\n" + " DEPT ID DEPT NAME   O/H COSTS   TOT SALES");
    for (var i = 0; i < res.length; i++) {
        console.log(pad(res[i].department_id, 8) + // 3 chars
            pad(res[i].department_name, 10) + // 16 chars
            ' $' + pad(res[i].over_head_costs, 10) + // 8 chars
            ' $' + pad(res[i].total_sales, 10)); // 9 chars
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