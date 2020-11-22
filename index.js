import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import User from './models/User.js'

import { auth } from  './middleware/auth.js'

dotenv.config();

const app = express();

const mongodb_password = process.env.MONGODB_PASSWORD
const connection_url = `mongodb+srv://admin:${mongodb_password}@cluster0.jvazg.mongodb.net/template_mern_db?retryWrites=true&w=majority`

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log("DB Connected"))
.catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastname,
    role: req.user.role
  })
})

app.get('/', (req, res) => {
  res.send('hello world');
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) 
      res.status(500).json({ success: false, err})
    else
      res.status(200).send(userData);
  })
})

app.post('/api/user/login', (req, res) => {
  //find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });
    
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Auth failed, wrong password"
        })
    })
    

    user.generateToken((err, user) => {
      if (err)
        return res.status(400).send(err);
      res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true
        })
    })
  })
})

app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, 
    { token: ""}, (err, doc) => {
      if (err)
        return res.json({ success: false, err})
      return res.status(200).send({ success: true })
    })
})

app.listen(5000);