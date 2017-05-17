# AngularJS, NodeJS and Passport Authentication

This project is a simple Passport authentication in a Single-Page Application. The basic dynamic is that each request to the server must be authenticated so that restricted materials are locked behind the login form.

## Registration

The registration form takes the required fields and presents them into a MongoDB

## Login

The login form takes the required fields and pipes them through passport and upon success a JWT is generated so that the user requests can be validated.

## Logout

The logout request informs the server to destroy the record of the token so that subsiquent requests are denied to do unauthorized access.