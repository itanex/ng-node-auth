import * as express from 'express';
import * as passport from 'passport';

import { User, IUser } from '../models/user';

let router = express.Router();

router.post('/register', (req, res, next) => {
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

router.post('/login', (req, res, next) => {
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

export default router;