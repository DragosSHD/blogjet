module.exports = app => {
    const user = require("../controllers/user.controller");
    const router = require("express").Router;

    // CRUD Operations
    // CREATE new user
    router.post("/", user.create);
    // RETRIEVE ALL users
    router.get("/", user.findAll);
    // RETRIEVE a single user based on id
    router.get("/:id", user.findOne);
    // UPDATE user based on id
    router.put("/:id", user.update);
    // DELETE a user based on id
    router.delete("/:id", user.delete);
    // DELETE all users
    router.delete("/", user.deleteAll);

    app.use("/api/category", router);
};