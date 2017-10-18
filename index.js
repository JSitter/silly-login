/***********************************************
 *      SILLY-LOGIN
 *      V 1.0.0
 * 
 ***********************************************/
const express      = require('express')
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
const app = express()

var jwt = require('jsonwebtoken')

//Load Helper functions
var helpers = require("./helpers.js")
 
/***********************************************
 *  Setup Secret Key **** INSECURE DEV ENV
 *  ****NOTE THAT THIS SHOULD BE 
 *          REMOVED AND SET
 *      IN A MORE SECURE FASHION********
 ***********************************************/
process.env.SECRET = "sEcReTkEy"

/****************************************************
//Setup Handlebars and pass in preference parameters:   
//      Default layout name:        main
//      handlebars doc extension    hbs
 ***************************************************/
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}))

//Set handlebars to be express view engine
app.set('view engine', 'hbs')

//Use CookieParser in express app
app.use(cookieParser())
 
/****************************************************
 *  MAIN LANDING PAGE
 ***************************************************/
app.get('/', (req, res) => {
    res.send(req.cookies)
})

/****************************************************
 *  LOGIN FORM PAGE
 ***************************************************/
app.get('/login', (req, res)=>{
    //render login form
    res.render("login")
})

/****************************************************
 *  GET LOGIN INFORMATION
*      AND SET COOKIE
 ***************************************************/
app.post('/auth', (req, res)=>{

    var token = jwt.sign({ _id: 'sampleuserid' }, process.env.SECRET, { expiresIn: "60 days" });
    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    
    let keys = Object.keys(req.cookies)
    //console.log(keys)
    res.redirect('/')
})

/****************************************************
 * Verify User
 ***************************************************/
var checkAuth = function (req, res, next) {
    console.log("Checking authentication");
  
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next()
  }
  
  app.use(checkAuth)

app.listen(8751)