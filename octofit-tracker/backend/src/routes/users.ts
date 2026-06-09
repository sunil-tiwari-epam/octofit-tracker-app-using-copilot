import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

router.get('/', (req: Request, res: Response) => {
  res.json({ data: users });
});

router.post('/', (req: Request, res: Response) => {
  const user = { id: `${Date.now()}`, ...req.body };
  users.push(user);
  res.status(201).json({ data: user });
});

export default router;
