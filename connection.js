const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your MySQL username
  user: "root",
  // Your MySQL password
  password: "Fib.235813",
  database: "employeeTrack",
});
module.exports = connection;
