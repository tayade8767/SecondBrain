import mongoose, { model, Types } from "mongoose";

const Schema = mongoose.Schema;

import { DATABASE_URL } from "./config"; 

function callformongoconnection() {
    mongoose.connect(`mongodb+srv://${DATABASE_URL}`)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Connection failed", err);
    });
}


callformongoconnection();

//   user Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        unique: true,
        type: String,
        required: true
    }
});

export const UserModel = model("User", UserSchema);


//   contect Schema

const ContentSchema = new Schema({
    title: String,
    Link: String,
    type: String,
    tags: [{ 
        type: mongoose.Types.ObjectId,
        ref: "tag",
    }],
    userId:[{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }]
});

export const ContentModel = model("Content",ContentSchema);

//    content for the LinkSchema model

const LinkSchema =  new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export const LinkModel = model("Link",LinkSchema);
