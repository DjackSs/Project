import mysql from "mysql";

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: process.env.DATA_HOST,
    user: process.env.DATA_USER,
    password: process.env.DATA_PW,
    database: process.env.DATA_NAME,
});

export default pool;
