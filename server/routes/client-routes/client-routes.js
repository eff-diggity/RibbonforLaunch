const express = require("express");

const auth = require('../../middleware/auth-middleware')

const router = express.Router();

const Client = require("../../models/client"); //Import our mongoose client schema which we use to validate create new user
router.use(express.json()); //allows us to access req.body
router.use(express.urlencoded({ extended: true }));

const path2 = require("path");

router.get('/clients/:id', (req, res) => { //Grabs single client from DB by pulling ID from route params
    const _id = req.params.id;

    Client.findById(_id).then((client) => {
        if (!client) {
            return res.status(404).send(error, "resource not found");
        }
        console.log(client)
        res.send(client)
    }).catch((error) => {
        res.status(404).send(error);
    });
});

module.exports = router;