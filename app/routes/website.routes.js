module.exports = app => {
  const router = require("express").Router();

    router.get('/', async (req, res) => {
        res.render('home');
    });

    app.use('', router);
};