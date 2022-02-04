require("../controllers/website.controller");
module.exports = app => {
  const router = require("express").Router();
  const Website = require("../controllers/website.controller")

  // Homepage
  router.get('/', async (req, res) => {
    await Website.launchHomepage(req, res);
  });
  // Categories page
  router.get('/category', async (req, res) => {
    await Website.launchCategory(req, res);
  })
  // Create post page
  // Categories page
  router.get('/new_post', async (req, res) => {
    await Website.launchPostForm(req, res);
  })

  const urlencoded = require("body-parser").urlencoded({ extended: false });
  router.post('/new_post', urlencoded,  async (req, res) => {
    await Website.launchPostFormSuccess(req, res);
  })

    app.use('', router);
};