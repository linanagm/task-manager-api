import { connectDb, syncTables } from "./DB/db.connection.js";


const bootstrap = (app , express) => {
    app.use(express.json());

     connectDb();
     syncTables();

     app.all('{/*dummy}', (req, res, next) => {
        
        res.status(404).json({ message: `Not Found Handler : ${req.originalUrl}` , statusCode: 404 });
    });
    


};

export default bootstrap;