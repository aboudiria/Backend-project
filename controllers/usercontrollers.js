//install bcrypt package : npm i bcrypt;
// install validator package : npm validator;


const UserSchema = require("../models/UserSchema");
const User= require("../models/UserSchema");
const validator = require('validator');
exports.signup = async(req,res)=>{
    try {
        if(!validators.isEmail{req.body["email"]}){
            return res.status(400).json({message:"invalid email"});
        }
        const checkUserExistance= awit user.findOne({
            $or : [{email : req.body['email']},{username: req.body["username"]}],
        });
        if(checkUserExistance){
            return res.status(401).json({message:"user alredy exit"});

        }
        if(req.body["password"]!== req.body["passwordConfirm"]){
            return res.status(400).json({message:"please emter matching password and password confirm"})
        }
        const newUser=awit User.create({
            firstName: req.body["firstName"],
            lastName: req.body["lastName"],
            userName: req.body["userName"],
            email: req.body["email"],
            phoneNumber: req.body["phoneNumber"],
            password: req.body["password"],
            passwordConfirm: req.body["passwordConfirm"],
            passwordChangeAt: Date.now(),

        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});   
    }
}
exports.login= async(req,res)=>{
    try {
        const {email, password}=req.body;
        const user= await User.findOne({email});
        if(!user || awit user.checkPassword(password,user.password)){
            return res.status(400).json({message:"invalid cridentials"});
        }
        return res.status(200).json({message:" login succefully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"err.message"})
    }
}