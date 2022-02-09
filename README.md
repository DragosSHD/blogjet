
  <h3 align="center">Blogjet</h3>
<br />


## About

Blogjet is an easy tool to build your own blog. Create posts, categories and manage users easily from a simplified UI. This app has been developed as a project for the 
FullStack Javascript course provided by [Generatia Tech](https://generatiatech.ro/cursuri/fullstack-javascript/).

## Technical details

Blogjet is built using Node.js for server runtime and Express as the web framework. CRUD operations on data models are implemented through API endpoints to provide future compatibility
with a potential UI library like React. SEO features are aided by the possibility of specifying keywords for each post, which will be included as metadata.

Pages of this application have a minimal loading time as server side rendering was used with [Embedded JavaScript templating](https://ejs.co). 

Bootstrap and flex were used in order to provide easy to use and fast page styling.

Data is stored using a document oriented database (MongoDB) for simplicity and because of the
reduced number of required collections. Object modeling is implemented using mongoose. In order to handle sensitive data like user passwords, the [bcrypt](https://www.npmjs.com/package/bcrypt) library was used.
For preventing eronated data from reaching the database, [validator.js](https://www.npmjs.com/package/validator) was used on fields like the email address of a user. 


## Features to come

- authentication system in order to separate user space from admin space and manage permissions on post and category operations;

## Screenshots

![homepage](https://github.com/DragosSHD/blogjet/blob/master/demo_img/blogjet1.png)
![post page](https://github.com/DragosSHD/blogjet/blob/master/demo_img/blogjet2.png)
![edit a post page](https://github.com/DragosSHD/blogjet/blob/master/demo_img/blogjet3.png)
![category page](https://github.com/DragosSHD/blogjet/blob/master/demo_img/blogjet4.png)

### Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com)
* [Ejs](https://ejs.co)
* [MongoDB](https://www.mongodb.com)
* [Mongoose](https://mongoosejs.com)
