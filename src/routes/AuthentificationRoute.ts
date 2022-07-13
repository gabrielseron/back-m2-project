import { Router } from 'express';
import { Request, Response } from 'express';
import { registerMiddleware, loginMiddleware, authMiddleware, refreshMiddleware, authAdminMiddlewareFinish, verifEmailMiddleware, resetPasswordMiddleware, changePasswordMiddleware} from '../middlewares/AuthentificationMiddleware';
import { AuthentificationController } from '../controllers/AuthentificationController';
const route: Router = Router();

route.get('/', (req: Request, res: Response) =>
{
    return res.end('<h1>Connected</h1>')
})

route.post('/login', loginMiddleware, AuthentificationController.login);
route.post('/register', registerMiddleware, AuthentificationController.register);

route.get('/verifEmail/:token', verifEmailMiddleware, AuthentificationController.verifEmail)

route.post('/resetPassword', resetPasswordMiddleware, AuthentificationController.resetPassword)
route.put('/changePassword', changePasswordMiddleware, AuthentificationController.changePassword)

export { route as AuthentificationRoute };