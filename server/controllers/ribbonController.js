const Category = require("../models/Category");
const mongoose = require('mongoose');
const BlogPost = require("../models/BlogPost");
const Contact = require("../models/contact");
const about = require("../models/about")
/**
 * Get/
 * Homepage
 */
exports.homepage = async (req, res) => {
    try {//base query to grab categories
        const limitNumber = 5; //CHANGE WHEN ADD BLOG CATEGORIES/add shop and workshop page
        const categories = await Category.find({}).limit(limitNumber);

        res.render('index', { title: 'Ribbon Home', categories });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
}

/**
 * Get/
 * About
 */
exports.about = async (req, res) => {
    try {//base query to grab categories
        const limitNumber = 5; //CHANGE WHEN ADD BLOG CATEGORIES/add shop and workshop page
        const categories = await Category.find({}).limit(limitNumber);

        res.render('about', { title: 'Ribbon About', categories });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
}
/**
 * Get/blog
 * blog
 */
exports.exploreBlog = async (req, res) => {
    try {//base query to grab categories
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        // category= db category, can add .limit(limitNumber) when blog grows 
        const plantPosts = await BlogPost.find({ 'category': 'Plants Medicine' });
        const tarotPosts = await BlogPost.find({ 'category': 'Tarot' });
        const astrologyPosts = await BlogPost.find({ 'category': 'Astrology' });
        const occultPosts = await BlogPost.find({ 'category': 'Occult History' });
        const classesPosts = await BlogPost.find({ 'category': 'Classes' });

        const post = { plantPosts, tarotPosts, astrologyPosts, occultPosts, classesPosts }

        res.render('blog', { title: 'Ribbon Blog', categories, post });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }

}
/**
 * POST/searchResults
 * SearchResults
 */
exports.searchBlog = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm; //body bc coming from a form
        let blog = await BlogPost.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        //UN-COMMENT TO RUN SEARCH TEST
        //  res.json(blog);  
        res.render('searchResults', { title: 'Ribbon Search Results' });

    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }

}

//adding contact function info to RibbonController to avoid multiple controllers
//following Form Controller youtube video from Francesca

exports.contact = async (req, res) => {
    res.render('contact');
}

async function insertDummyContactData() {
    try {
        Contact.insert([
            {
                "name": "Sam",
                "emailAddress": "dummyemail@j.com",
                "message": "test contact Message"
            }
        ]);
    } catch (error) {
        console.log('error,' + error)
    }
}
