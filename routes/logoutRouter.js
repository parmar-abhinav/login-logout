const express = require('express');
const bodyParser = require('body-parser');
const logoutRouter = express.Router();
const User = require('../models/user');
const sequelize = require('../data/database');
const bcrypt = require('bcryptjs');

logoutRouter.use(bodyParser.json());

logoutRouter.route('/')
.post((req, res, next) => {
    console.log("logout");
    req.session.destroy();
    res.send("logout successfully");
    res.end();
});

module.exports = logoutRouter;