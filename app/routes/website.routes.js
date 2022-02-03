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

    app.use('', router);
};