import User from '../../models/Users.js'
import bcrypt from 'bcrypt'
const salt = 10;

export const register = async (req, res) => {
    try {

        const { username, email, password, } = req.body;
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = await User.create({ username, email, passwordHash })
        res.status(200).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                cart: newUser.cart,
                createdAt: newUser.createdAt,   
            }
        })
    }
    catch (error) {
        res.status(400).json({ message: "Error registering user", error: error.message })
    }

}

