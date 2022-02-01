// Imports
const express = require("express");
const app = express();

// Static files
app.use(express.static('./app/public'));
app.use('/css', express.static(__dirname + 'app/public/css'));
app.use('/js', express.static(__dirname + 'app/public/js'));
app.use('/img', express.static(__dirname + 'app/public/img'));

// Set template engine
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

require(__dirname + '/app/routes/post.routes')(app);

// Listen to port 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



