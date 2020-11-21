import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(5000);