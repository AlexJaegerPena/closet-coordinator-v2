import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
} from '../controllers/userControllers.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
