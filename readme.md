# AngularJS, NodeJS and Passport Authentication

This project is a simple Passport authentication in a Single-Page Application. The basic dynamic is that each request to the server must be authenticated so that restricted materials are locked behind the login form.

## Registration

The registration form takes the required fields and presents them into a MongoDB

## Login

The login form takes the required fields and pipes them through passport and upon success a JWT is generated so that the user requests can be validated.

## Logout

The logout request informs the server to destroy the record of the token so that subsiquent requests are denied to do unauthorized access.

# Form Data Validation

Never trust the user. In the case of validating form data, never trust that the browser provided you clean data even through it passes the client side validation. It is easy to bypass the browser and send data to an endpoint to 'hack' the endpoint; also, you might cause yourself headaches if there are bugs on the client validation. How do we solve this?

## Server side validation

Express has an extension called `express-validation` that attaches functionality directly into the express request handlers. So validation is as easy as:

### One - Configuring your Express Application
```Typescript
...

// Establish the express validation 
let expressValidator = require('express-validator');

...

// Configuring the application
...
app.use(expressValidator());
``` 
### Two - Creating a validation handler
```Typescript
function validateRegister (req, res, next) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('username', 'Username must be alphanumeric').isAlphanumeric();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    return next();
}
``` 

### Three - Calling the validation handler
```Typescript
router.post('/register', validateRegister, (req, res, next) => { 
    ...
});
```