const mysql = require("mysql2/promise");
const { dbHost, dbPort, dbUser, dbPassword, dbName } = require("../config");

const pool = mysql.createPool({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName
});

async function query(sql, data) {
    const [rows, _] = await pool.query(sql, data);
    return rows;
}

module.exports = {
    query
};
