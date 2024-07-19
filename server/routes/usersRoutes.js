import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
} from '../controllers/userControllers.js';

import {
  isAdmin,
  isAuthenticated,
  isOwnerOrAdmin,
} from '../middlewares/authMiddlewares.js';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.post('/', createUser);
router.get('/:id', isAuthenticated, isOwnerOrAdmin, getUser);
router.put('/:id', isAuthenticated, isOwnerOrAdmin, updateUser);
router.delete('/:id', isAuthenticated, isOwnerOrAdmin, deleteUser);

export default router;
