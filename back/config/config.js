require("dotenv").config();

console.log(process.env.COOKIE_SECRET);
console.log(process.env.MYSQL_PASSWORD);

module.exports = {
  development: {
    username: "root",
    // password: process.env.MYSQL_PASSWORD,
    password: "Bm10200425!",
    database: "sleact",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    // password: process.env.MYSQL_PASSWORD,
    password: "Bm10200425!",
    database: "sleact",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    // password: process.env.MYSQL_PASSWORD,
    password: "Bm10200425!",
    database: "sleact",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
