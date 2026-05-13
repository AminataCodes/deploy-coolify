import prisma from '../models/prisma.js'
import { hashPass} from '../utils/passwords.js';

const getAllUsers = async()=> {
    const usersList = await prisma.user.findMany({
    
        select: {
        id: true,
        name: true,
        email: true
    }
    });
    const usersCount = await prisma.user.count();
    return {
        data:usersList,
        total: usersCount,
    };
};

const getUserById = async(id)=>{
    const user = await prisma.user.findUnique({
        where: {id},
            select: {
        id: true,
        name: true,
        email: true
    }
    })
    return {
        data: user
    };
};

const createUser = async(userData)=> {
    const createdUser = await prisma.User.create({
        data:{
            email: userData.email,
            name: userData.name,
            password: await hashPass(userData.password)
        }
    });
    return {
        data: {createdUser}
    };
};

const updateUser = async(id,userData)=>{
    const updatedUser = await prisma.user.update({
        where : {id},
        data : {
            ...(userData.email && {email: userData.email}),
            ...(userData.name && {email: userData.name})
        }
    });
    return {
        data: updatedUser
    };
};

const deleteUser = async(id)=>{
    const user = await getUserById(id);
    if (user.data) {
    return prisma.user.delete ({where:{id}});}
    return false;
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
