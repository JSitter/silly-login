//Get secret key from environment variable
let secret = process.env.SECRET

// generate a GUID
function generateGUID() {
    return new Date().getTime(); // we can do better with crypto
  }
  
// create JWT
function generateToken(req, GUID, opts) {
opts = {
    cats: "mine"
};

// By default, expire the token after 7 days.
// NOTE: the value for 'exp' needs to be in seconds since
// the epoch as per the spec!
var expiresDefault = Math.floor(new Date().getTime()/1000) + 7*24*60*60;

var token = jwt.sign({
        auth:  GUID,
        agent: req.headers['user-agent'],
        exp:   opts.expires || expiresDefault
    }, secret);
    return token;
}

function generateAndStoreToken(req, opts) {
    var GUID   = generateGUID(); // write/use a better GUID generator in practice
    var token  = generateToken(req, GUID, opts);
    var record = {
        "valid" : true,
        "created" : new Date().getTime()
    };
};