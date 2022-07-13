import { Router } from 'express';
import { PromoController } from '../controllers/PromoController';
import { authMiddleware, authAdminMiddleware } from '../middlewares/AuthentificationMiddleware';
import { GetPromoUsersMiddleware, PostPromoMiddleware } from '../middlewares/PromoMiddleware';
const route: Router = Router();

route.get('/', PromoController.getAll);
route.get('/:id', GetPromoUsersMiddleware, PromoController.getUsers);
route.post('/', PostPromoMiddleware, PromoController.create);

export { route as PromoRoute };