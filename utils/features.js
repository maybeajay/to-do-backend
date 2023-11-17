import  jwt from "jsonwebtoken"
export const setCookie= async(singleUser, message, statuscode, res)=>{
    const token = jwt.sign({_id: singleUser?._id}, process.env.JWT_SECRET)
    res.status(statuscode).cookie('token', token, {
        httpOnly: true,
        maxAge: 1500*60*1000
    }).json({
        sucess: true,
        message: message
    }) 
}