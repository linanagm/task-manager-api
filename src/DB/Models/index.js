import  userModel  from "./user.model.js";
import  taskModel  from "./task.model.js";
import { sequelize } from "../db.connection.js";

// 💡 Define relationships
userModel.hasMany(taskModel, { foreignKey: "userId" });
taskModel.belongsTo(userModel, { foreignKey: "userId" });

// Export models + sequelize connection
export { userModel, taskModel, sequelize };
