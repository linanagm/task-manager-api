import { sequelize } from "../db.connection.js";
import { DataTypes } from "sequelize";

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
        validate: {
            checkPasswordLength(value){
                if(value.length < 8){
                    throw new Error("Password must be at least 8 characters long.");
                }
            }
        },
    },
}, {
    timestamps: true,
});

export default userModel