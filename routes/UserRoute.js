import express from "express";
import { 
    createUser, 
    deleteUserById, 
    getUserById, 
    getUsers, 
    updateUserById
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.post('/users', createUser);
router.patch('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);

export default router;
