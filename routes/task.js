import express from 'express';
// project imports
import { deleteTask, getMyTask, newTask, updateTask } from '../controllers/task.js';
import { isAunthicated } from '../middlewares/auth.js';

// ussing router middleware
const router  = express.Router();

// routes
router.post('/new', isAunthicated,newTask)
router.get('/mytask', isAunthicated,getMyTask)
router.route("/:id").put(isAunthicated, updateTask).delete(isAunthicated,deleteTask)

// exporting
export default router;