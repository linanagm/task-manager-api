import { sequelize } from "../db.connection.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"

const userModel = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            console.log("⏳ Hashing password for:", user.email);

            //check password length
            if(user.password.length < 8){
                throw new Error("Password must be at least 8 characters long.");
            }

            //hash password
            const hashedPassword = await bcrypt.hash(user.password, 10); //10 is the salt rounds
            user.password = hashedPassword;

            console.log("✅ Password hashed!");


        },
    }
});

export default userModel