import User from "../models/UserModel.js";
import argon2 from "argon2";

export const createUser = async (req, res) => {
    try {
        const { email, username, password, confPassword, phone } = req.body;

        const emailIsUnique = await User.findOne({ email });
        const usernameIsUnique = await User.findOne({ username });
        const phoneIsUnique = await User.findOne({ phone });

        if (emailIsUnique)
            return res.status(400).json({ message: "Email is already exist." });

        if (usernameIsUnique)
            return res.status(400).json({ message: "Username is already exist." });

        if (phoneIsUnique)
            return res.status(400).json({ message: "Phone is already exist." });

        if (password !== confPassword)
            return res
                .status(400)
                .json({ message: "Password and Confirm Password are not the same." });

        if (password.length < 8)
            return res
                .status(400)
                .json({ message: "The password must have at least 8 characters" });

        const hashPassword = await argon2.hash(password);

        const user = new User(req.body);
        user.password = hashPassword;
        await user.save();
        res.status(201).json({ message: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select({
            password: 0,
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select({
            password: 0,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { username, password, confPassword, phone } = req.body;

        const oldUser = await User.findById(req.params.id);

        const usernameIsUnique = await User.findOne({ username }).select({
            _id: 1,
            username: 1,
        });
        const phoneIsUnique = await User.findOne({ phone }).select({
            _id: 1,
            phone: 1,
        });

        if (usernameIsUnique._id.toString() !== req.params.id)
            return res.status(400).json({ message: "Username is already exist." });

        if (phoneIsUnique._id.toString() !== req.params.id)
            return res.status(400).json({ message: "Phone is already exist." });

        if (password === "" || password === null) {
            req.body.password = oldUser.password;
        } else {
            if (typeof (password) === 'number') return res
                .status(400)
                .json({ message: "Passwords cannot use integers" });

            if (password.length > 8)
                return res
                    .status(400)
                    .json({ message: "The password must have at least 8 characters" });

            if (password !== confPassword)
                return res
                    .status(400)
                    .json({ message: "Password and Confirm Password are not the same." });

            const match = await argon2.verify(oldUser.password, password);
            if (match) { req.body.password = oldUser.password };

            req.body.password = await argon2.hash(password);
        }

        const updatedUser = await User.updateOne(
            {
                _id: req.params.id,
            },
            {
                $set: req.body,
            }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const deletedUserById = await User.deleteOne({
            _id: req.params.id,
        });
        res.status(200).json(deletedUserById);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
