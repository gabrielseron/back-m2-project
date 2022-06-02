import { Router } from 'express';
import { Request, Response } from 'express';
import { registerMiddleware, loginMiddleware, authMiddleware} from '../middlewares/AuthentificationMiddleware';
import { AuthentificationController } from '../controllers/AuthentificationController';
const route: Router = Router();

route.get('/', (req: Request, res: Response) =>
{
    return res.end('<h1>Connected</h1>')
})

route.post('/login', loginMiddleware, AuthentificationController.login);
route.post('/register', registerMiddleware, AuthentificationController.register);


export { route as AuthentificationRoute };