import { Router } from 'express';
import { PromoController } from '../controllers/PromoController';
import { authMiddleware, authAdminMiddleware } from '../middlewares/AuthentificationMiddleware';

const route: Router = Router();

route.get('/', authMiddleware, PromoController.getAll);
route.post('/', authAdminMiddleware, PromoController.create);

export { route as PromoRoute };