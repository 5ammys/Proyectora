//import Song from "../models/song.js";
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userFounded = await User.findOne({ email })
        if (userFounded) {
            return res.status(400).json(['The email already exists'])
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await user.save()
        const token = await createAccessToken({ id: userSaved.id });

        res.cookie('token', token);

        res.json({
            id: userSaved.id,
            username: userSaved.username,
            password: userSaved.password,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.status(400).json(['User not found'])
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json(['incorrect password'])

        const token = await createAccessToken({ id: userFound.id });

        res.cookie('token', token);
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message)
    }
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = (req, res) => {
    res.send('profile');
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(401).json(["Unauthorized"]);

        const userFound = await User.findById(user.id)

        if (!userFound) { 
            return res.status(401).json(["User not founded"]);
         }

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    })
}