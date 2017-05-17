import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as expressJWT from 'express-jwt';

// Establish the express validation 
let expressValidator = require('express-validator');

// Import API/Routes
import Users from './routes/users';

// Integrate Passport Configuration
require('./passport/config');

const app = express();
const authenticate = expressJWT({secret: 'SecretKey'});

// Establish Database Connection
mongoose.connect('mongodb://admin:admin@ds064299.mlab.com:64299/ng-node-auth');

// Configuring the application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Application with Passport
app.use(passport.initialize());
app.use(passport.session());

// Establish Routes in the application
app.use('/api/users', Users);

// Test Route
app.get('/api/profile', authenticate, (req, res, next) => {
  res.status(200).send('You found the magic key');
});

// Catchall/Application endpoint
app.get('/*', (req, res, next) => {
    res.sendFile('./public/index.html');
});

export = app;
