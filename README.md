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

## UML
![auth-lab-09-uml](https://user-images.githubusercontent.com/55909913/175998675-182965d1-bb76-47cf-b694-a625f796bcfb.png)
