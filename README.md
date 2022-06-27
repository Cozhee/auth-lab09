# LAB - Class 401

## Project: Lab09

### Authors: Cody Davis, Ben Choe

### Problem Domain
Setting up a basic express server to configure heroku deployment and to create tests for basic routes. Implemented with sequelize. Set up encryption and the use of jsonwebtokens. Set up protected routes that will check a users permissions and capabilities before they are allowed to enter a route and perform specific actions

### Links and Resources
- [Github](https://github.com/Cozhee/auth-lab09/pulls)

### Setup

#### `.env` requirements (where applicable)
- `SECRET=`
This secret key will be for using a jsonwebtoken. This `SECRET` key can be any ordinary string representing a secret word or phrase

- `DATABASE_URL`
You may use a database of your choosing just be sure to add it into the `.env` file to allow sequelize to connect to your database


#### How to initialize/run your application (where applicable)
`npm install` to get the dependencies
`nodemon` to run the server
Open `http://localhost:3001/` to view the server

#### How to use your library (where applicable)
N/A

#### Features / Routes
- Feature One: Added route
- POST : `/signup`
- POST : `/signin`

- Feature Two: Added route
- GET: `/:model/:id`
- POST: `/:model/:id`
- PUT: `/:model/:id`
- DELETE: `/:model/:id`

Each route will be using middleware to check if a user has basicAuth or bearerAuth included in these requests. These are protected routes which are unreachabled by un authenticated users. Also a permissions middleware that will check user capabilities


#### Tests
To run tests type `npm test`. Server does not need to be running in another instance
Basic tests that will check if routes are working correctly


## UML

![UML](img/lab-09-uml.png)
