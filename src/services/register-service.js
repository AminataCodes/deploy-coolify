import prisma from "../models/prisma.js"
import { hashPass} from '../utils/passwords.js';
import { generatetoken } from "../utils/token.js";


const register = async ({email, name,password})=>{
// Find if email is not already used

    const userEmail = await prisma.user.findUnique({
        where: {email}
    })
    if (userEmail){
          throw new Error("Email already used");
    
    }
 
    // Hasher le mot de passe avant de le stocker
const hashedPassword = await hashPass(password, 10);
    const user = await prisma.user.create({
        data:{
            email,
            name,
            password: hashedPassword
        },
            select: {
        id: true,
        name: true,
        email: true
    }

    

    });
    const token = generatetoken(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token,
    };
};

const connectedUser = async(id)=>{
        const user = await prisma.user.findUnique({
            where : {id},
            select: {
        id: true,
        name: true,
        email: true
    }
        })
        return {
            data: user
        }
}
    
    export {
        register,
        connectedUser
    }