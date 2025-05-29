// Imports
const express = require('express')
const cookieParser = require("cookie-parser");
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser');
var cors = require('cors') 
const port = 5500 
const app = express()
app.use(cors())
const config = require('config'); 
const host = config.get('server.host');
const api_host_root = config.get('server.api_host_root');
const allowedIps = ['*'];






// SET COOKIE PARSE
app.use(cookieParser());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "anyrandomstring",
    })
);







// Static Files
app.use(express.static('public'))

app.use('/images', express.static('images')); 
app.use('/css', express.static(__dirname + 'public/css'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

// Routes
 
const transaction_Route = require("./routes/transactions.js") 
const deposit_Route = require("./routes/deposit.js") 
const Portfolio_Route = require("./routes/portfolios.js") 
const trade_Route = require("./routes/trade.js")
const withdraw_Route = require("./routes/withdraw.js") 
const addAccount_Route = require("./routes/addAccount.js") 
const trading_Route = require("./routes/trading.js") 
const profile_Route = require("./routes/profile.js") 
const notFound_Route = require("./routes/notFound.js") 
const dashboard_Route = require("./routes/dashboard.js")


app.use("/dashboard", dashboard_Route ) 
app.use("/transactions", transaction_Route ) 
app.use("/portfolio", Portfolio_Route ) 
app.use("/trade", trade_Route ) 
app.use("/404", notFound_Route ) 
app.use("/deposit", deposit_Route ) 
app.use("/profile", profile_Route ) 
app.use("/withdraw", withdraw_Route ) 
app.use("/add-account", addAccount_Route ) 
app.use("/trading", trading_Route ) 




const oneDay = 1000 * 60 * 60 * 24;

// Normal User routing
app.get('', (req, res) => {
    res.render('index', {api_host : api_host_root ,  site_root : host, title: 'Janta Portal', layout: "./layouts/landing_page" })
})

app.get('/transactions', (req, res) => {
    res.render('transactions/index', {api_host : api_host_root ,  site_root : host, title: 'Janta Portal', layout: "./layouts/landing_page" })
})


app.get('/login', (req, res) => {
    console.log(req.session)
    res.render('login', {api_host : api_host_root ,  site_root : host,  title: 'Janta Portal',  layout: './layouts/clear_page' });
});

app.get('/register', (req, res) => {
    console.log(req.session)
    res.render('register', {api_host : api_host_root ,  site_root : host,  title: 'Janta Portal', layout: false });
});


// Logged In User Routing



app.get('/user', (req, res) => {
    res.render('logged_user/index', {api_host : api_host_root ,  site_root : host,  title: 'Person', layout: './layouts/layout_executive_user', "session" : req.session.user_info })
    if (req.session.user_info) {      
        res.render('logged_user/index', {api_host : api_host_root ,  site_root : host,  title: 'Person', layout: './layouts/layout_executive_user', "session" : req.session.user_info })
    }
    else {
        res.redirect('/login');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about', { api_host : api_host_root ,  site_root : host,  title: 'About Page', layout: './layouts/sidebar' })
})








// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))