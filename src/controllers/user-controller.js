import * as userService from '../services/user-service.js'

const getAllUsers = async (req , res ,next ) => {
    try {
        const results = await userService.getAllUsers();
        res.json(results);
    } catch (error){
        next(error);
    }
};
const getUserById = async (req , res ,next ) => {
    try {
        const userId= req.params.id;
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error){
        next(error);
    }
};
const createUser = async (req , res ,next ) => {
    try {
        const userData = req.body;
         if (!userData.email || !userData.name || !userData.password){
            return res.status(400).json({
                message: "Email, name and password are required!!"
            })
        }
        const user = await userService.createUser(userData);
        res.json(user);
        
    } catch (error){
        next(error);
    }
};
const updateUser = async (req , res ,next ) => {
    try {
        const userId= req.params.id;
        const userData = req.body;
        const user = await userService.updateUser(userId, userData);
        res.json (user);
    } catch (error){
        next(error);
    }
};

const deleteUser = async (req , res ,next ) => {
    try {
        const userId= req.params.id;
    const deleteResponse = await userService.deleteUser(userId);
    if  (!deleteResponse) {
         res.json ({message: 'User Not Found'});
    }
        res.json ({message: 'User deleted successfully'});
    } catch (error){
        next(error);
    }
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
