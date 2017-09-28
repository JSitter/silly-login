const express      = require('express')
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
 
const app = express()

//Setup Handlebars and pass in preference parameters:   
//      Default layout name:        main
//      handlebars doc extension    hbs
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}))

//Set handlebars to be express view engine
app.set('view engine', 'hbs')

app.use(cookieParser())
 
/****************************************************
 *  MAIN LANDING PAGE
 ***************************************************/
app.get('/', (req, res) => {
    res.send(req.cookies)
})

/****************************************************
 *  LOGIN PAGE
 ***************************************************/
app.get('/login', (req, res)=>{

})
app.listen(8751)
 
// curl command that sends an HTTP request with two cookies 
// curl http://127.0.0.1:8751 --cookie "Name=Nor;Species=Mantis" 