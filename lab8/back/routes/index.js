const express = require('express');
const router = express.Router();
const {User} = require('../models');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNpbndyMjAxNEBnbWFpbC5jb20iLCJpYXQiOjE3MTYyOTYxOTMsImV4cCI6MTcxNjI5NzA5M30.RwjVr3M0VVVWvaq8xgv_i3Ju0kg9bPGPrDXq4jSwlMg'

router.post('/register', async (req, res) => {
  let {login, password} = req.body;

  const user = await User.findOne({
    where: {login: login}
  });
  if (user) {
    return res.status(400).json({error: `User with login '${login}' already exists`});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    login: login,
    password: hashedPassword
  });

  res.status(200).json();
})

router.post('/login', async (req, res) => {
  const {login, password} = req.body;

  const user = await User.findOne({
    where: {login: login}
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(403).json({error: "invalid email or password"});
  }

  const accessToken = jwt.sign({"login": login}, secret);
  res.status(200).json({accessToken: accessToken});
})

router.get('/secret', async (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({error: "Unauthorized"});
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({error: err});
    }
    res.status(200).json({secret: "Your login extracted from JWT is \'" + decoded.login + '\''});
  });
})

module.exports = router;
