
import { userModel } from "../../DB/Models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//create new user -> register
export const registerUser = async( req, res, next) => {
    
    try {
        const { name , email, password } = req.body;
        
        //check if all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user exists in users
        const user = await userModel.findOne({where: {email}});

        if(user){
            return res.status(400).json({message: "User already exists"});
        }
    
        //create user
        const newUser = await userModel.create({name, email, password});
        
        //remove password before response => donnot show password in response
        const { password: pwd, ...userWithoutPassword } = newUser.dataValues;

        res.status(201).json({
            message: "User created successfully", 
            user: userWithoutPassword
        });

        return newUser;

    } catch (error) {
        
        res.status(500).json({message: "Something went wrong", error:error.message});
    }


    
}


//User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        //check if all fields are filled
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        //check if user exist
        const user = await userModel.findOne({where: {email}});

        if(!user){
            return res.status(404).json({message: "User does not exist"});
        }

        //check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message: "Password is incorrect"});
        }

        // generate JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        //send response
        const { password: pwd, ...userWithoutPassword } = user.dataValues;
        res.status(200).json({
            message: "User logged in successfully",
            user: userWithoutPassword,
            token,
        });




    } catch (error) {
        res.status(500).json({message: "Something went wrong", error:error.message});
    }
    
}