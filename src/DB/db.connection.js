import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT
    }
    
)

export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export const syncTables = async() => {
    try {
        await sequelize.sync( { force: true } , { alter: true } );
        console.log("Tables have been synced successfully.");
    } catch (error) {
        console.error("Error syncing tables:", error);
    }
}