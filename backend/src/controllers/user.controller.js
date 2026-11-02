import User from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username, password, and email are required' });
        }
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const user = await User.create({ name: username.toLowerCase(), password, email: email.toLowerCase(), loggedIn: false });
        res.status(201).json({ message: 'User registered successfully', 
            user: user._id, email: user.email, name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if(!user){ 
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({
            message: "User logged in successfully",
            user: user._id,
            email: user.email,
            name: user.name,
        });
    }catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const logoutUser = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ 
            email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User logged out successfully" });

    }catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export { 
    registerUser, 
    loginUser,
    logoutUser
};