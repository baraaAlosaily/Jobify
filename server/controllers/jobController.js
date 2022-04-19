
const createJob=async(req,res)=>{
    res.send("create Job")
}
const deleteJob=async(req,res)=>{
    res.send("delete Job")
}
const getAllJob=async(req,res)=>{
    res.send("get all Job")
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