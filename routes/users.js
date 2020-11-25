import express from 'express'
import User from '../models/User.js'

import { auth } from  '../middleware/auth.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('user 1');
})

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastname,
    role: req.user.role
  })
})

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) 
      res.status(500).json({ success: false, err})
    else
      res.status(200).send(userData);
  })
})

router.post('/login', (req, res) => {
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

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, 
    { token: ""}, (err, doc) => {
      if (err)
        return res.json({ success: false, err})
      return res.status(200).send({ success: true })
    })
})

export default router