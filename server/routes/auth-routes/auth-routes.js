const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth-middleware')
const session = require('express-session')

const Client = require("../../models/client"); //Import our mongoose client schema which we use to validate create new user
router.use(express.json()); //allows us to access req.body
router.use(express.urlencoded({ extended: true }));
 router.use(session({secret: 'ErgoSum'}))


const path2 = require("path");
const { resolveNaptr } = require("dns");
const expressLayouts = require('express-ejs-layouts');



router.get('/clients/signup', function(req, res) {
    res.render('signup');
  });
router.post('/clients/signup', async (req, res)=>{ //build client object from form data
    const client = new Client({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    try{
        await client.save()
        const token = await client.generateToken()
        req.session.client_id = client._id
        res.status(201).send({token, client})
    }catch(error){
        res.status(400).send()
    }
});

router.get('/clients/login', function(req, res){
    res.render('login');
})

router.post('/clients/login', async (req, res)=>{

    try {
        const client = await Client.findByCredentials(req.body.email, req.body.password)
        const jwtToken = await client.generateToken()
        req.session.client_id = client._id
        res.redirect('/clients/me')
    }catch(error){
        console.log(error)
        res.status(400).send()
    }
})

router.get('/clients/me',  async function(req, res) {
    try  {
        if(!req.session.client_id){
            console.log('session id failed: ', req.session.client_id)
            throw new Error()
        }
        const client = await Client.findById(req.session.client_id)
        console.log(client)
        res.render('clientprofile', {client: client})
    }catch(error){
        res.status(401).send("Error Authenticating")
    }
});

router.post('/clients/logout', auth, async (req, res)=>{
    try {
        req.client.tokens = req.client.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.client.save()
    }catch(error){
        res.status(500).send()
    }
})
//Deletes all authorization session tokens
router.post('/clients/logoutall', auth, async (req, res)=>{
    try {
        req.client.tokens = []
        await req.client.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
})
module.exports = router;