const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = express.Router();
const User = require('../models/user');
const sequelize = require('../data/database');
const bcrypt = require('bcryptjs');


loginRouter.use(bodyParser.json());

loginRouter.route("/")
.post((req, res, next) => {
    console.log("request received");
    const em = req.body.email;
    const password = req.body.password;
    User.findAll({where: {email:em}})
    .then(result => {
        const user = result[0];
        return bcrypt.compare(password, user.password)
    })
    .then(domatch => {
        console.log("..........................successfull.............................");
        if(domatch)
        {
            req.session.isloggedin = true;
            console.log("successfull logged in");
            res.send("login successful");
            res.end();
        }
        else
        {
            console.log("not successfull");
            res.send("password incorrect");
            res.end();
        }
    })
    .catch(err => {
        console.log(".......................error...........................");
        console.log(err);
        res.send("login unsuccessful");
        res.end();
    })
});

module.exports = loginRouter;