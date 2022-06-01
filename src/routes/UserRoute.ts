import { Router } from 'express';
import { Request, Response } from 'express';

const route: Router = Router();

route.get('/', (req: Request, res: Response) =>
{
    return res.end('<h1>Connected</h1>')
})

export { route as UserRoute };