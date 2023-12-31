// Add this to the very top of the first file loaded in your app
// Add this to the very top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
  serviceName: 'launchstore',
  secretToken: 'fSEJy1tYJ8h1YiYP0q',
  serverUrl: 'https://2f20549b95034998acefbc98662f7fb5.apm.us-central1.gcp.cloud.es.io:443',
  environment: 'production'
})

const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');
const session = require('./config/session');

const server = express();

server.use(session);
server.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(80, function () {
  console.log('server is running on port 80.');
});
