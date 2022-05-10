import Jobs from "../models/Jobs.js";
import {StatusCodes} from 'http-status-codes';
import {BadRequestError,NotFoundError} from '../errors/index.js';

const createJob=async(req,res)=>{
    const {position,company}=req.body;

    if(!position || !company ){
        throw new BadRequestError('Please Provide All Values');
    }

    req.body.createdBy=req.user.userId;

    const job= await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}
const deleteJob=async(req,res)=>{
    res.send("delete Job")
}
const getAllJob=async(req,res)=>{
    const jobs= await Jobs.find({createdBy:req.user.userId});
    res.status(StatusCodes.OK).json({jobs,totalJobs:jobs.length,numberOfPages:1})
}
const updateJob=async(req,res)=>{
    res.send("update Job")
}
const showStats=async(req,res)=>{
    res.send("show stats Job")
}


export {
    createJob,
    deleteJob,
    getAllJob,
    updateJob,
    showStats
}