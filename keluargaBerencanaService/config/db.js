const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_keluarga_berencana"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;
