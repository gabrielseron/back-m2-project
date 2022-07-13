import { Router } from 'express';
import { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/AuthentificationMiddleware';
import { challengeMiddleware } from '../middlewares/ChallengeMiddleware';
import { ChallengeController } from '../controllers/ChallengeController';
const route: Router = Router();

route.get('/', (req: Request, res: Response) =>
{
    return res.end('<h1>Connected</h1>')
})

route.post('/', challengeMiddleware, ChallengeController.execute)
route.post('/test', challengeMiddleware, ChallengeController.isConnected)

export { route as ChallengeRoute };