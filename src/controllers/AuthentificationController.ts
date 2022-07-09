import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import PasswordException from '../exceptions/PasswordException';
import User from '../models/User';
import Promo from '../models/Promo';
import NodeMailerApi from '../services/NodeMailer';
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

            if (!user.isVerified) {
                throw new Error(`Email is not verified`)
            }

            if (await Promo.isExiste('id_promo', user.id_promo))
                promo = await Promo.select({ id_promo : user.id_promo});
            else
                throw new Error(`An error has occured with the promotion`)

            promo = promo[0];

            const accessToken: any = sign({user}, < string > process.env.JWT_KEY, { expiresIn: '24h' })

            const refreshToken: any = sign({user}, < string > process.env.JWT_REFRESH_KEY)

            // user.setToken({id_user: user.id}, {refresh_token: refreshToken})

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

        console.log(data);
        if (await Promo.isExiste('id_promo', data.id_promo)) {
            const password = await PasswordException.hashPassword(data.password);
            const token = '';
            const user = new User(null, data.email, password, false, data.id_promo, false, token);
            await user.save();


            const nodemailerToken: any = sign({user}, < string > process.env.JWT_KEY)
            const nodemailerResponse = await NodeMailerApi.verifEmail(data.email, nodemailerToken)

            return res.status(201).json({message: 'Success, check your email'});
        }
        else {
            throw new Error(`Promo don't exist`)
        }
       } catch (error) {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
       }
    }

    static verifEmail = async(req: Request, res: Response) =>
    {
        let data = await ( < any > decode(req.params.token)).user;
        let user: any;
        console.log("data");

        try {
            if (await User.isExiste(data.email))
                user = await User.select({ email : data.email});
            else
                throw new Error(`User don't exist!`)
            if (user.length <=0)
                throw new Error(`Email don't exist!`)

            user = user[0];

            user.verifEmail();
            return res.status(201).json({message: 'Email verified'});
        } catch (error) {
            return res.status(401).json({ error: true, message: (error as any).message }).end();
        }
    }

    static resetPassword = async(req: Request, res: Response) =>
    {
        let data: any = req.body;
        let user: any;
        try {
            if (await User.isExiste(req.body.email))
                user = await User.select({ email: req.body.email });
            else
                throw new Error(`User don't exist!`)
            if (user.length <=0)
                throw new Error(`Email don't exist!`)

            user = user[0];

            const nodemailerToken: any = sign({user, reason: 'resetPassword'}, < string > process.env.JWT_KEY)
            const nodemailerResponse = await NodeMailerApi.resetPassword(data.email, nodemailerToken)

            return res.status(201).json({message: 'Success, check your email'});
        } catch (error) {
            return res.status(401).json({error: true, message: (error as any).message}).end();
        }
    }

    static changePassword = async(req: Request, res: Response) =>
    {
        let data: any = req.body;
        let user: any;
        let email: string = await ( < any > decode(data.token)).user.email;

        try {
            if (await User.isExiste(email))
                user = await User.select({ email });
            else
                throw new Error(`User don't exist!`)
            if (user.length <=0)
                throw new Error(`Email don't exist!`)

            user = user[0];

            const password = await PasswordException.hashPassword(data.password);

            user.changePassword(password)

            return res.status(201).json({message: 'Password changed'});

        } catch (error) {
            return res.status(401).json({error: true, message: (error as any).message}).end();
        }
    }
}