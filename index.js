const express      = require('express')
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
 
const app = express()

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
 *  PAGE TO GET POST DATA FORM FORM
 ***************************************************/
app.post('/view', (req, res)=>{
    let keys = Object.keys(req.cookies)
    
    console.log(keys)
    res.send(req.cookies)
})

app.listen(8751)