import * as registerService from "../services/register-service.js"

const register = async ( req , res , next) => {
    try {
    const {name,email, password}= req.body;
    if (
        !email || !password || !name
    ){
        return res.status(400).json({
            message :"Name, Email and password are required!!"
        })
    }
    const result = await registerService.register({name,email, password});
    res.status(201).json(result)
    } catch (error){
        next(error)
    }
}

const connectedUser = async (req,res, next)=>{
    try {
        const userId = req.body.id
    const user = await registerService.connectedUser(userId)
    res.status(200).json(user);
}

    catch (error){
    next(error)
    };
};
export {
    register,
    connectedUser
}