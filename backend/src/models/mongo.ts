import {Document, Schema, Model, model, connect, SchemaTypeOpts} from "mongoose";
import configDB from '../config/database';

export interface IUser {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
}

export interface IUserModel extends IUser, Document {
    fullName(): string;
}
// configuration ===============================================================
connect(configDB.url, {
  useMongoClient: true
}); // connect to our database

// create instance of Schema
// create schema
const UserSchema: Schema  = new Schema({
    userEmail: {type: String},
    userPassword: {type: String}
});

UserSchema.pre('save', (next) => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
UserSchema.methods.fullName = (): string => {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);