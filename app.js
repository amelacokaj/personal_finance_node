const express = require('express');
//const browserSync = require('browser-sync');//https://ponyfoo.com/articles/a-browsersync-primer //const fallback = require('connect-history-api-fallback');
const path = require('path');
const fs = require('fs');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
//const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//GLOBAL CONSTANTS
global.PROJECT_DIR = path.resolve('./');
global.APP_DIR = path.resolve(__dirname);

const app = express();
const port = process.env.PORT || 3000;

// VIEW ENGINE
const viewsDir = path.join(APP_DIR, 'views');
app.set('views', viewsDir);
//app.set('view engine', 'hjs');
app.engine('handlebars', exphbs({ defaultLayout: 'layout', layoutsDir: path.join(viewsDir, 'layouts')}));
app.set('view engine', 'handlebars');

/**
 *  https://github.com/domfarolino/angular2-login-seed/blob/master/routes/index.js
 **

const allowedOrigins = ['http://localhost:3000'];

router.use(function(request, response, next) {
  var origin = request.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
       response.setHeader('Access-Control-Allow-Origin', origin);
  }
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
*/

// REQUIRED FOR PASSPORT
// Express Session
app.use(session({
	secret: 'personal_finance_APP',
	resave: false,
    saveUninitialized: false
}));
// Passport init
/* TODO:
app.use(passport.initialize());
app.use(passport.session());
require(APP_DIR+'/config/passport')(passport); // pass passport for configuration
*/
// Global Vars
app.use(function (req, res, next) {	
	res.locals.user = req.user || null;
	next();
});


//STATIC FOLDER FOR PRODUCTION RELEASE
app.use(express.static(path.join(PROJECT_DIR, '/dist')));

//STATIC FOLDER FOR GENERATED DOCS
app.use('/docs', express.static(path.join(PROJECT_DIR, '/store/docs/')));

//http://4dev.tech/2016/02/creating-a-live-auction-app-with-angular-2-node-js-and-socket-io/
app.use('/scripts', express.static(path.join(PROJECT_DIR, '/node_modules/')));

//app.use("/", express.static(path.join(PROJECT_DIR, '/dist'))); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * ROUTES/CONTROLLERS 
 */
//app.use('/api', require('./routes')); 

app.get('/', function (req, res) {
    res.send('Hello World!')
});
















//HANDLE ALL HTTP ERRORS
app.use(function(err, req, res, next) {
	console.error('ROUTES ERROR HANDLER', err.stack);
    res.status(err.status || 500).end();
});

/*app.get('/test/:param', function (req, res) {
	res.send('Hello World!'+req.params['param']);
});*/

// 404 catch 
app.all('*', function (req, res) {
  console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
  res.status(200).sendFile(path.join(PROJECT_DIR, '/dist/index.html'));
});

app.listen(port, function () {
	console.log('Server started at: ' + port);
});
