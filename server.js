// Imports
const express = require("express");
const app = express();
const parser = require("body-parser");

// Static files
app.use(express.static(__dirname + '/app/public'));
app.use('/css', express.static(__dirname + '/app/public/css'));
app.use('/js', express.static(__dirname + '/app/public/js'));
app.use('/img', express.static(__dirname + '/app/public/img'));

// Use Parser
app.use(parser.json());

// Set template engine
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

require(__dirname + '/app/routes/post.routes')(app);
require(__dirname + '/app/routes/user.routes')(app);
require(__dirname + '/app/routes/category.routes')(app);
require(__dirname + '/app/routes/website.routes')(app);

// Listen to port 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to the database
const db = require('./app/models');
// noinspection JSCheckFunctionSignatures,JSVoidFunctionReturnValueUsed
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    })

