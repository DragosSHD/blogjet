const db = require("../models");
const User = db.user;
const Category = db.category;
const Post = db.post;


// Render homepage
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

// Render category page
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

// Render post form
exports.launchPostForm = async (req, res) => {
    const categoriesData = await Category.find({}).lean();
    res.render('pages/post_form', {
        categories: categoriesData,
        title: "New Post",
        h1: "Create a new post",
    });
};


// Render success page and handle data
exports.launchPostFormSuccess = async (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    req.body.keywords = req.body.keywords.split(" ");
    req.body.author = "61fa87662186882dcf66f42c";
    // Create a Post
    const post = new Post({
        title: req.body.title,
        keywords: req.body.keywords,
        shortDescription: req.body.shortDescription,
        imgPath: req.body.imgPath,
        author: req.body.author,
        category: req.body.category,
        isPublished: req.body.isPublished ? req.body.isPublished : false
    });
    // Save Post in the database
    post
        .save(post)
        .then(() => {
            res.render('pages/post_form_success.ejs' , {
                title: "Post Created",
                h1: "Post created successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

