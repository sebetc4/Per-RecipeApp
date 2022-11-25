import { Schema, model, models } from 'mongoose';
import { ApiErrors } from '../../types/api.types';
var validator = require('validator');
import bcrypt from 'bcrypt'

interface IUser {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Invalid username'],
            min: [6, 'Invalid username'],
            max: [20, 'Invalid username'],
        },
        email: {
            type: String,
            required: [true, 'Invalid email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Invalid password'],
            min: [6, 'Invalid password'],
            max: [40, 'Invalid password'],
        },
        avatar: String,
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('validate', async function() {
    const user = await User.findOne({email: this.email});
    if (user) {
        throw ApiErrors.EMAIL_ALREADY_EXISTS
    }
    if (!validator.isEmail(this.email)) {
        throw ApiErrors.INVALID_EMAIL
    }
});

UserSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10)
});

export const User = models.User || model<IUser>('User', UserSchema);
