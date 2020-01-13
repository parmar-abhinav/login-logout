const express = require('express');
const http = require('http');
const sequelize = require('./data/database');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');


var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'backend'
};

const sessionStore = new MySQLStore(options);


const port = 3001;
const hostname = 'localhost';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use((req, res, next) => {
    res.send("404 eror");
    res.end();
})

// let passworda;
// bcrypt.hash('1234', 12)
// .then(hashedpassword => {
//     console.log(hashedpassword);
//     passworda=hashedpassword;
// })
// .then(() => {
//     User.create({
//         email: 'abhi171b010@gmail.com',
//         password: passworda
//     })
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })
// .catch(err => {
//     console.log(err);
// });

sequelize.sync();

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log("server is running");
})
