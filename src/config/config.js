require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "Arango181997",
    "database": process.env.DB_NAME || "GDS_consulting_SAP",
    "host": process.env.DB_PORT || "127.0.0.1",
    "dialect": process.env.DB || "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
