const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const loginUser = async (email, password) => {

    // Find user
    const user = await User.findOne({
        email: email.toLowerCase()
    });


    // Check user exists
   if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401; // Attach custom status code to the error object
    throw error; 
   }

    // Compare password
    const isMatch = await bcrypt.compare(
        password,
        user.passwordHash
    );

    // Password mismatch
    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
 
    // Generate JWT token
    const token = generateToken(user._id);

    // Return result
    return {

        token,
        user
    };
};


const  RegisterUser = async (email, password) =>{
  
    // Check if user already exists
    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });
    
    if (existingUser) {
      
        const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;

    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user
    await User.create({
        email: email.toLowerCase(),
        passwordHash: passwordHash
    });
}

module.exports = {
    loginUser,
    RegisterUser
};
