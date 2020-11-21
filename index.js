import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import User from './model/User.js'

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

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) 
      res.status(500).json({ success: false, err})
    else
      res.status(200).send(userData);
  })
})

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(5000);