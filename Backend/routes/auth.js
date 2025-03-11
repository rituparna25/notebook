const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var fetchuser = require ('../middleware/fetchuser')
var jwt = require('jsonwebtoken');
const router = express.Router()

require('dotenv').config({ path: './Backend/.env' });
const JWT_secret = process.env.JWT_SECRET

//Route1:Create a user using POST "/api/auth/createuser".No login
router.post('/createuser',[
    body('name' , 'Enter a valid name').isLength({min: 3}),
    body('email','Enter valid mail-id').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min: 5}),
],async(req,res)=>{
  let success=false;
    // If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });
  }
  //Check if the user with this mail already exists
  try {
    let user =  await User.findOne({email:req.body.email})
    if (user){
        return res.status(400).json({success, errors: "Sorry! User with this mail-id already exists" });
    }
     const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(req.body.password, salt);
    //create new user
    user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
  });
  const data ={
    user:{
      id:user.id
    }
  }
  const authtoken = jwt.sign(data,JWT_secret);
  success = true;
  res.json({success,authtoken})
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error occured")
}
})
//Route2:Create a user using POST "/api/auth/login".No login required
router.post('/login',[
  body('email','Enter valid mail-id').isEmail(),
  body('password','Password cannot be blank').exists(),
],async(req,res)=>{
  let success = false
 // If there are errors return bad request and errors
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
 return res.status(400).json({success,errors: errors.array() });
}

const {email,password} = req.body;
try {
  let user = await User.findOne({email});
  if(!user){
    success=false
    return res.status(400).json({success,error: "Please try to login with valid credentials"});
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if(!passwordCompare){
    success=false
    return res.status(400).json({success ,error: "Please try to login with valid credentials"});
  }
  const data ={
    user:{
      id:user.id
    }
  }
  const authtoken = jwt.sign(data,JWT_secret);
  success=true;
  res.json({success,authtoken})
} catch (error) {
  console.error(error.message)
  res.status(500).send("Internal server Error occured")
}
})

//Route3: Get loggedin user details POST "/api/auth/getuser".login required

  router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user)
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server Error occured")
  }
})
module.exports = router