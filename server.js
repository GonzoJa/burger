var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

// Use Handlebars to render the main index.html 
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burger;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burger: data });
  });
});

app.post("/burger", function(req, res) {
  connection.query("INSERT INTO burger (burger_name) VALUES (?)", [req.body.burger], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

   
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});


app.get("/burger_name", function(req, res) {
  connection.query("SELECT * FROM burger;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});


app.put("/burger/:id", function(req, res) {
  connection.query("UPDATE burger SET burger_name = ? WHERE id = ?", [req.body.burger_name, req.params.id], function(err, result) {
    if (err) {r
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

//
app.delete("/burger/:id", function(req, res) {
  connection.query("DELETE FROM burger WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
    
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

app.listen(port, function() {
  console.log("listening on port", port);
});
