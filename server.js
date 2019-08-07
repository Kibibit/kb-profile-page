'use strict';
const url = require('url');
const _ = require('lodash');
const nconf = require('nconf');
const flash = require('connect-flash');
const session = require('express-session');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const UnauthorizedError = require('./unauthorized-error');

nconf.argv()
.env({
  lowerCase: true,
  parseValues: true,
  transform: (obj) => {
    const isCamelCaseConvertable = /[A-Za-z0-9]+/gm.test(obj.key);

    return {
      key: isCamelCaseConvertable ? _.camelCase(obj.key) : obj.key,
      value: obj.value
    };
  }
})
.required(['kbCookieSecret', 'kbJwtSecret', 'kbApp'])

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(nconf.get('kbCookieSecret')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(express.static(__dirname + '/public'));

app.get('/', authenticatedMiddleware, (req, res, next) => {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies);

  // Cookies that have been signed
  // console.log('Signed Cookies: ', req.signedCookies);

  cookieParser.JSONCookies(req.cookies);
  try {
    const profile = _.cloneDeep(JSON.parse(req.cookies.profile));

    res.render('profile.ejs', {
      profile,
      customBackground: nconf.get('kbCustomBg'),
      hideKibibit: nconf.get('kbHideKibibit'),
      applicationName: nconf.get('kbApp'),
      applicationIcon: nconf.get('kbIcon') || 'https://image.flaticon.com/icons/svg/119/119595.svg'
    });
  } catch (err) {
    console.error(err);

    next(err);
  }

  
});


// global error handler
app.use(errorHandler);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function authenticatedMiddleware(req, res, next) {
  const jwtSecret = nconf.get('kbJwtSecret');
  const userJwt = req.cookies && req.cookies.jwt;

  if (userJwt && jwt.verify(userJwt, jwtSecret)) {
    const decodedJwt = jwt.decode(userJwt, jwtSecret, { json: true });

    // console.log('jwt value: ', decodedJwt);

    if (['thatkookooguy'].includes(decodedJwt.profile.username.toLowerCase())) {
      next();
    } else {
      next(new UnauthorizedError('organization_membership', { message: 'User is not part of the authorized group' }));
    }
  } else {
    next(new UnauthorizedError('credentials_required', { message: 'No authorization token was found' }));
  }
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status);
  res.render('error.ejs', { error: err, statusCode: status });
}
