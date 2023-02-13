const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { resource } = require("../app");

mongoose.Promise = Promise;

/*
GIVEN: name, username, email, password, confirmPassword,
       phonenumber, birthday, city, tags, profileImage url
RETURN: 'ok' if successfully registered user
*/
exports.register = async (req, res) => {
  console.log("registering");
  console.log(req.body);

  const {
    name,
    username,
    email,
    password: plaintTextPassword,
    confirmPassword,
    phoneNumber,
    birthday,
    city,
    tags,
    profileImage,
  } = req.body;

  if (plaintTextPassword !== confirmPassword)
    return res.json({ status: 'error', error: 'Passwords do not match!'})
  
  if (!name || typeof name !== 'string')
    return res.json({ status: 'error', error: 'Invalid name!' })

  if (!username || typeof username !== 'string')
    return res.json({ status: 'error', error: 'Invalid username!' })

  if (!email || typeof email !== 'string')
    return res.json({ status: 'error', error: 'Invalid email!' })

  if (!plaintTextPassword || typeof plaintTextPassword !== 'string')
    return res.json({ status: 'error', error: 'Invalid password!' })

  const password = await bcrypt.hash(plaintTextPassword, 10);
  
  const friends = [];
  const blocked = [];  
  const outgoingRequests = [];
  const incomingRequests = [];

  try {
    const response = await User.create({
      name,
      username,
      email,
      password,
      phoneNumber,
      birthday,
      city,
      profileImage,
      tags,
      friends,
      blocked,
      outgoingRequests,
      incomingRequests
    })

    console.log('User succesfully registered: ', response)

  } catch (error) {
    if (error.code === 11000) // duplicate key
      return res.json({ status: 'error', error: 'Username or email already in use!' })
    
    throw error
  }
  
  res.json({ status: 'ok' })
};