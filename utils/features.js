import  jwt from "jsonwebtoken"
export const setCookie= async(singleUser, message, statuscode, res)=>{
    const token = jwt.sign({_id: singleUser?._id}, process.env.JWT_SECRET)
    res.status(statuscode).cookie('token', token, {
        httpOnly: true,
        maxAge: 1500*60*1000,
        sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
        secure:process.env.NODE_ENV == "Development" ?true:false
    }).json({
        sucess: true,
        message: message
    }) 
}