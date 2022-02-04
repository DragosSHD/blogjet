module.exports = app => {
    const post = require("../controllers/post.controller")
    const router = require("express").Router();

    // CRUD Operations
    // CREATE new post
    router.post("/", post.create);
    // CREATE new post based on form
    router.post("/form", post.createFromForm);
    // RETRIEVE ALL posts
    router.get("/", post.findAll);
    // RETRIEVE a single post based on id
    router.get("/:id", post.findOne);
    // UPDATE post based on id
    router.put("/:id", post.update);
    // DELETE a post based on id
    router.delete("/:id", post.delete);
    // DELETE all posts
    router.delete("/", post.deleteAll);
    
    app.use('/api/post', router);
};