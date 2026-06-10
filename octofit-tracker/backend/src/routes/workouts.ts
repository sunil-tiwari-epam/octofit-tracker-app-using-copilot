import { Router } from 'express';
import type { Request, Response } from 'express';
import Workout from '../models/workout.ts';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({ data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ data: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

export default router;
