import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import PasswordException from '../exceptions/PasswordException';
import User from '../models/User';
import Promo from '../models/Promo';
export class AuthentificationController
{

    static login = async(req: Request, res: Response) =>
    {
        let data: any = req.body;
        let user: any
        let promo: any

        try {
            if (await User.isExiste(data.email))
                user = await User.select({ email : data.email});
            else
                throw new Error(`User don't exist!`)

            if (user.length <=0)
                throw new Error(`Email don't exist!`)

            user = user[0];

            const isOk = await PasswordException.comparePassword(data.password, user.password);

            if (!isOk) 
                throw new Error(`Wrong password`)

            if (await Promo.isExiste(user.id_promo))
                promo = await Promo.select({ id_promo : user.id_promo});
            else
                throw new Error(`An error has occured with the promotion`)

            promo = promo[0];

            const accessToken: any = sign({user}, < string > process.env.JWT_KEY, { expiresIn: '60s' })

            const refreshToken: any = sign({user}, < string > process.env.JWT_REFRESH_KEY)

            user.setToken({id_user: user.id}, {refresh_token: refreshToken})

            const response = {
                email: user.emailUser,
                promo: promo.getname,
                token: accessToken,
                refreshToken: refreshToken,
                expired: await ( < any > decode(accessToken)).exp
            }

            return res.status(201).json(response);
        } catch (err) {
            return res.status(401).json({ error: true, message: (err as any).message }).end();
        }
    }

    static register = async(req: Request, res: Response) =>
    {
        let data: any = req.body;
       try {
        if (await User.isExiste(data.email))
            throw new Error(`Email already used!`)

        if (await Promo.isExiste(data.id_promo)) {
            const password = await PasswordException.hashPassword(data.password);
            const token = '';
            const user = new User(null, data.email, password, false, data.id_promo, false, token);
            await user.save();

            return res.status(201).json({message: 'Success'});
        }
        else {
            throw new Error(`Promo don't exist`)
        }
       } catch (error) {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
       }
    }
}