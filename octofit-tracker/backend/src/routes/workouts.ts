import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const workouts = [
  { id: 'workout-1', name: 'Full Body HIIT', durationMinutes: 45, intensity: 'high' },
  { id: 'workout-2', name: 'Morning Yoga', durationMinutes: 30, intensity: 'low' },
];

router.get('/', (req: Request, res: Response) => {
  res.json({ data: workouts });
});

router.post('/', (req: Request, res: Response) => {
  const workout = { id: `workout-${Date.now()}`, ...req.body };
  workouts.push(workout);
  res.status(201).json({ data: workout });
});

export default router;
