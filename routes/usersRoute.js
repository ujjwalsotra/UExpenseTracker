const express=require('express');
const User=require('../models/User')
const router=express.Router();

router.post('/login', async function(req, res) {
   try {
    const result=await User.findOne({email :req.body.email, password:req.body.password})
    if(result)
    {
        res.send(result)
    }
    else
    {
        res.status(500).json('Error')
    }
   }catch(err) {
    res.status(500).json(err);
   }
});
router.post('/register', async function(req, res) {
    try {
     const newuser=new User(req.body);
     await newuser.save();
     res.send('user Registration Successfully');
    }catch(err) {
     res.status(500).json(err);
    }
 });

 module.exports= router;