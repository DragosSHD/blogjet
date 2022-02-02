module.exports = app => {
  const router = require("express").Router();

    router.get('/', async (req, res) => {
        res.render('pages/home');
    });

    app.use('', router);
};