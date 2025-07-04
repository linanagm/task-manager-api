import {Router} from "express";

const router = Router();

router.get("/tasks", (req, res) => {
    res.send("Task Route");
})
export default router