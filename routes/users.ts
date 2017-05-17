import * as express from 'express';
import * as passport from 'passport';

import { User, IUser } from '../models/user';

let router = express.Router();

router.post('/register', validateRegister, (req, res, next) => {
  let user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save((err, user) => {
    if (err) {
      return next(err);
    }

    res.status(200).send('Registration Complete. Please login.');
  });
});

router.post('/login', validateLogin, (req, res, next) => {
  passport.authenticate('local', (err, user: IUser, info) => {
    console.log('User is authenticated', user);

    if(err) {
      return next(err);
    }

    if(user) {
      return res.status(200).json(user.generateJWT());
    }

    return res.status(400).send(info);
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  
  res.status(204).end();
});


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

function validateLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    return next();
}

export default router;