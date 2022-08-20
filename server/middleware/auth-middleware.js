const jwt = require('jsonwebtoken')
const Client = require('../models/client')

const auth = async (req, res, next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'CogitoErgoSum')
        const client = await Client.findOne({ _id: decoded._id, 'tokens.token': token})
        if(!client){
            throw new Error()
        }
        req.token = token
        req.client = client
        next()

    }catch(error){
        res.status(401).send({ error: "please authenticate"})
    }
}

module.exports = auth