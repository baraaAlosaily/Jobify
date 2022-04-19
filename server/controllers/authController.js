import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import {BadRequestError} from "../errors/index.js"

const register=async(req,res)=>{
    const {name,email,password}=req.body;

    if(!name||!email||!password){
        throw new BadRequestError('Please provide all values')
    }

    const userAlreadyExist=await User.findOne({email})
     
    if(userAlreadyExist){
        throw new BadRequestError("Email is already in use")
    }

    const user =await User.create({name,email,password})
    const token= user.creatJWT();
    res.status(StatusCodes.OK)
    .json({user:{email:user.email,
    lastName:user.lastName,name:user.name},token,location:user.location})
}
const login=async(req,res)=>{
    const user=await User.findOne(req.body);
    res.status(201).json({user})
}
const updateUser=async(req,res)=>{
    res.send('updateuser user')
}

export{
    register,
    login,
    updateUser
}