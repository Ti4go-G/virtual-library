import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

