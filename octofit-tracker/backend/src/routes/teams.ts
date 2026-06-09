import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const teams = [
  { id: 'team-1', name: 'OctoFit Warriors', members: 12 },
  { id: 'team-2', name: 'Sprint Squad', members: 8 },
];

router.get('/', (req: Request, res: Response) => {
  res.json({ data: teams });
});

router.post('/', (req: Request, res: Response) => {
  const team = { id: `team-${Date.now()}`, ...req.body };
  teams.push(team);
  res.status(201).json({ data: team });
});

export default router;
