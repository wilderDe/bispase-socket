const Sequelize = require('sequelize');


// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false
    },
);
module.exports = {
    sequelize
}