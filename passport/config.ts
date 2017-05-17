import * as passport from 'passport';
import * as mongoose from 'mongoose';

let LocalStrategy = require('passport-local').Strategy;

import { IUser } from '../models/user';

let User = mongoose.model<IUser>('User');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new LocalStrategy((username: string, password: string, done) => {
    User.findOne({ username: username }, (err, user: IUser) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Invalid Username or Password' });
        }

        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Invalid Username or Password' });
        }

        return done(null, user);
    })
}));