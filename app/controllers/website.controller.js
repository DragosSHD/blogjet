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
    if(!await Category.exists({ name: req.query.name})) {
        res.render('pages/404', {
            title: "404 - Not found"
        });
    } else {
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
    }
};

// Render post page
exports.launchPost = async(req, res) => {
    const crtId = req.query.id;

    if(crtId.length !== 24) {
        res.render('pages/404', {
            title: "404 - Not found"
        })
    } else {
        const categoriesData = await Category.find({}).lean();
        const postData = await Post.findById(crtId).lean();
        const crtCategory = await Category.findById(postData.category).lean();

        res.render('pages/post', {
            categories: categoriesData,
            post: postData,
            title: postData.title,
            h1: postData.title,
            currentCategory: crtCategory.name
        });
    }
}

// Render post form
exports.launchPostForm = async (req, res) => {
    const categoriesData = await Category.find({}).lean();
    res.render('pages/form_create_post', {
        categories: categoriesData,
        title: "New Post",
        h1: "Create a new post",
    });
};

// Render post edit form
exports.launchPostEditForm = async (req, res) => {
    const categoriesData = await Category.find({}).lean();
    const crtPost = await Post.findById(req.body.id);
    res.render('pages/form_edit_post', {
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
    //TODO: Manage the author after implementing authentication.
    req.body.author = "61fa87662186882dcf66f42c";
    // Create a Post
    const post = new Post({
        title: req.body.title,
        keywords: req.body.keywords,
        shortDescription: req.body.shortDescription,
        imgPath: req.body.imgPath,
        author: req.body.author,
        category: req.body.category,
        articleText: req.body.articleText,
        isPublished: (req.body.isPublished === "on")
    });
    // Save Post in the database
    post
        .save(post)
        .then(() => {
            res.render('pages/create_success' , {
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


exports.launchCategoryForm = async (req, res) => {
    res.render('pages/form_create_category', {
        title: "New Category",
        h1: "Create a new category",
    });
}


exports.launchCategoryFormSuccess = async (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    //TODO: Manage the author after implementing authentication.
    req.body.author = "61fa87662186882dcf66f42c";
    const category = new Category({
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        author: req.body.author
    });
// Save Category in the database
    category
        .save(category)
        .then(() => {
            res.render('pages/create_success', {
                title: "New Category",
                h1: "Category created successfully!",
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });


}

exports.launchUserForm = async (req, res) => {
    res.render('pages/form_create_user', {
        title: "New User",
        h1: "Add a new user",
    });
}




