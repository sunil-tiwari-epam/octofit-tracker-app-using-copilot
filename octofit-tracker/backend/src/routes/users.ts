import { Router } from 'express';
import type { Request, Response } from 'express';
import User from '../models/user.ts';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('team', 'name');
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate('team', 'name');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load user' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;
