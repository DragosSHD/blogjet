const db = require("../models");
const Post = db.post;

// Create and Save a new Post
exports.create = (req, res) => {
// Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
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
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};


// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options:
                "i" } } : {};
    Post.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Posts."
            });
        });
};


// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Post with id " + id }
                );
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({ message: "Error retrieving Post with id=" + id });
        });
};


// Update a Post by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found!`
                });
            } else res.send({ message: "Post was updated successfully." });
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};



// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            } else {
                res.send({
                    message: "Post was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};


// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Posts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Posts."
            });
        });
};

