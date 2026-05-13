import prisma from "../models/prisma.js"
import { ComparePass } from "../utils/passwords.js";
import { generatetoken } from "../utils/token.js";


const login = async ({email, password})=> {

    // Find if user exist

    const user = await prisma.user.findUnique({
        where: {email}
    })
    if (!user){
        const error= new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    //Compare passwords

    const isPassValid = await ComparePass(password, user.password)
    if (!isPassValid){
        const error= new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
 
    const token = generatetoken(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token,
    }

};

 
export {
    login
}