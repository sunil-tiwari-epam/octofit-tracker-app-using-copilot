import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const leaderboard = [
  { rank: 1, user: 'Alice', score: 980 },
  { rank: 2, user: 'Bob', score: 860 },
  { rank: 3, user: 'Charlie', score: 820 },
];

router.get('/', (req: Request, res: Response) => {
  res.json({ data: leaderboard });
});

export default router;
