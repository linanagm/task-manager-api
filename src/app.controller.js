import { connectDb, syncTables } from "./DB/db.connection.js";
import userController from "./Modules/User/user.controller.js";
import taskController from "./Modules/Task/task.controller.js";

const bootstrap = (app , express) => {
    
    app.use(express.json());

     connectDb();
     syncTables();


     app.use("/user", userController);
     app.use("/task", taskController);
     app.all('{/*dummy}', (req, res, next) => {
        
        res.status(404).json({ message: `Not Found Handler : ${req.originalUrl}` , statusCode: 404 });
    });
    


};

export default bootstrap;