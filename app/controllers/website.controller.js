const db = require("../models");
const User = db.user;
const Category = db.category;
const Post = db.post;


// Get categories to display
exports.launchHomepage = async (req, res) => {

    const categoriesData = await Category.find({}).lean();
    const postsData = await Post.find({}).lean();

    res.render('pages/home', {
        categories: categoriesData,
        posts: postsData,
        title: "Home",
        h1: "Recent Posts"
    });
};

// Get categories to display
exports.launchCategory = async (req, res) => {

    const categoriesData = await Category.find({}).lean();
    const crtCategory = await Category.find({ name: req.query.name }).lean();
    const postsData = await Post.find({ category: crtCategory}).lean();

    res.render('pages/category', {
        categories: categoriesData,
        posts: postsData,
        title: req.query.name,
        h1: "Category",
        currentCategory: req.query
    });
};

