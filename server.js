const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const siginin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : 'game!123',
      database : 'smart-brain'
    }
  });

const app = express();

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

app.use(bodyParser.json());
app.use(cors());

//see got how many user in database
app.get('/', (req,res) => {
    // res.send(database.users);
    res.send("success");
})

//signin --> post = success/fail
app.post('/signin', (req, res) => { siginin.handleSignin(req, res, db, bcrypt)})

//register --> post = registering new users
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//get user id by searching id
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})

//the user log in times
app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.listen(3001, () =>{
    console.log("app is run successful on port 3001");
});