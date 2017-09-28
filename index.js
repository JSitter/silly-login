const express      = require('express')
const cookieParser = require('cookie-parser')
 
const app = express()

app.use(cookieParser())
 

app.get('/', (req, res) => {
  console.log('Cookies: ', req.cookies)
})
 
app.listen(8751)
 
// curl command that sends an HTTP request with two cookies 
// curl http://127.0.0.1:8751 --cookie "Name=Nor;Species=Mantis" 