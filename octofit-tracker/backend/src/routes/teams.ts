import { Router } from 'express';
import type { Request, Response } from 'express';
import Team from '../models/team.ts';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', 'name email');
    res.json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ data: team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

export default router;
