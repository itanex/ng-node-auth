import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from "jsonwebtoken";

export interface IUser extends mongoose.Document {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    salt: string;

    setPassword(password: string): void;
    validatePassword(password: string): boolean;
    generateJWT(): string;
}

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    passwordHash: String,
    salt: String
});

UserSchema.method('setPassword', function (password: string): void {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
});

UserSchema.method('validatePassword', function (password: string): boolean {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
    return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function (): string {
    return jwt.sign({
        id: this.id,
        username: this.username,
        email: this.email
    }, 'SecretKey', {
            expiresIn: '15m'
        });
});

export let User = mongoose.model<IUser>('User', UserSchema);
