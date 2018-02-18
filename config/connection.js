var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "burger_db",
  port: 3306
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;

// //This file initiates the connection to MYSQL

// //Dependencies
//  var Sequelize = require("sequelize");

//  //Creates the mysql connection 

//  var sequelize = new Sequelize("sequelize_library", "root", "password", {
//     host: "localhost",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     } 
//  });

//  // Exports the connection for other files to use
// module.exports = sequelize;
