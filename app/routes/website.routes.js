const Website = require("../controllers/website.controller");
module.exports = app => {
  const router = require("express").Router();
  const Website = require("../controllers/website.controller");
  const urlencoded = require("body-parser").urlencoded({ extended: false });

  // Homepage
  router.get('/', Website.launchHomepage);
  // Categories page
  router.get('/category', Website.launchCategory);
  // Post page
  router.get('/post', Website.launchPost);
  // Post creation form
  router.get('/new_post', Website.launchPostForm);
  // Handle post data
  router.post('/new_post', urlencoded,  Website.launchPostFormSuccess);
  // Post edit form
  router.get('/edit_post', Website.launchPostEditForm);
  // Handle post edit data
  router.post('/edit_post', urlencoded, Website.launchPostEditFormSuccess);
  // Delete post
  router.get('/delete_post/:id', Website.deletePost);
  // Category creation form
  router.get('/new_category', Website.launchCategoryForm);
  // Handle category data
  router.post('/new_category', urlencoded, Website.launchCategoryFormSuccess);
  // User creation form
  router.get('/new_user', Website.launchUserForm);


    app.use('', router);
};