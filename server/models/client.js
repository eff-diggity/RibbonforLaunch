const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const clientSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes("password")){
                throw new Error("Password cannot contain 'password' ")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
clientSchema.methods.toJSON = function(){
    const client = this
    const clientProfileObject = client.toObject()
    delete clientProfileObject.password
    delete clientProfileObject.tokens
    return clientProfileObject
}
clientSchema.methods.generateToken = async function(){
    const client = this
    const token = jwt.sign({ _id: client._id.toString()}, 'CogitoErgoSum')
    client.tokens = client.tokens.concat({ token })
    await client.save()
    return token
}
/** Middleware this hashes our password using BCryptjs just before we save
 * (first argument is the action we want to run the middleware on)  a client to the DB*/
clientSchema.pre('save', async function(next){ 
    const client = this
    if(client.isModified('password')){
        client.password = await bcrypt.hash(client.password, 8);
    }
    next();
})
/** Middleware for logging in grabs user by email submitted to form, 
 * uses bcrypt to check the form password with the hashed password stored in database */
clientSchema.statics.findByCredentials = async (email, password)=>{
    const client = await Client.findOne({ email })
    if(!client){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, client.password);
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return client
}
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;