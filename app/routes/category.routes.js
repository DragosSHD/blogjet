module.exports = app => {
    const category = require("../controllers/category.controller");
    const router = require("express").Router();

    // CRUD Operations
    // CREATE new category
    router.post("/", category.create);
    // RETRIEVE ALL categories
    router.get("/", category.findAll);
    // RETRIEVE a single category based on id
    router.get("/:id", category.findOne);
    // UPDATE category based on id
    router.put("/:id", category.update);
    // DELETE a category based on id
    router.delete("/:id", category.delete);
    // DELETE all categories
    router.delete("/", category.deleteAll);

  app.use("/api/category", router);
};