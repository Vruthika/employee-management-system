import express from "express";
import authMiddleware from '../middleware/authMiddleware.js';
import { addDept, getDepartments, getDepartment, updateDepartment, deleteDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.get('/', authMiddleware, getDepartments);
router.post('/add', authMiddleware, addDept);
router.get('/:id', authMiddleware, getDepartment);
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;
