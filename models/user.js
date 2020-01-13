const Sequelize = require('sequelize');

const sequelize = require('../data/database');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = User;