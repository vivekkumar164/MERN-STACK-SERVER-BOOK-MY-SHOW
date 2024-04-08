const express = require('express');
const user = require('../models/userModel');

const bcrypt = require('bcrypt');



const router = express.Router();

router.post('/register',async (req,res)=>{
    try {
        const userExists = await user.findOne({email:req.body.email})
        if(userExists){
            res.send({
                success : false,
                message: 'user already exists:'
            })

        }

        const salt = await bcrypt.genSalt(10)

        const hashPwd = bcrypt.hashSync(req.body.password , salt);
        req.body.password = hashPwd;

        const newUser = await user(req.body);
        await newUser.save();

        res.send({
            success : true,
            message: 'user Registered:'
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async(req,res)=>{
    try {
        const userExists = await user.findOne({email : req.body.email});
        if(!userExists){
            res.send({
                success:false,
                message:"user already exists please register"
            })
        }
       
        const validPassword = await bcrypt.compare(req.body.password , userExists.password);

        if(!validPassword){
            res.send({
                success:false,
                message:"wrong password"
            })
        }

        res.send({
            success:true,
            message:"you have successfully logged in"
        })

    } catch (error) {
        console.log(error);
    }
})

module.exports=router;