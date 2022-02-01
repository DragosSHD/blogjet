module.exports = app => {
    const router = require("express").Router();

    // Manage first page
    router.get('/', async (req, res) => {
        res.render('home');
    });
    app.use('', router);
};