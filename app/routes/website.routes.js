module.exports = app => {
  const router = require("express").Router();
  const Website = require("../controllers/website.controller");
  const urlencoded = require("body-parser").urlencoded({ extended: false });

  // Homepage
  router.get('/', Website.launchHomepage);
  // Categories page
  router.get('/category', Website.launchCategory)
  // Post creation form
  router.get('/new_post', Website.launchPostForm)
  // Post page success
  router.post('/new_post', urlencoded,  Website.launchPostFormSuccess)
  // Category creation form
  router.get('/new_category', Website.launchCategoryForm)


    app.use('', router);
};