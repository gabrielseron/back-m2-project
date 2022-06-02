import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import PasswordException from '../exceptions/PasswordException';
import User from '../models/User';

export class AuthentificationController
{
    static login = async(req: Request, res: Response) =>
    {
        let data: any = req.body;
        let user: any

        try {
            
        } catch (err) {
            
        }
    }

    static register = async(req: Request, res: Response) =>
    {

    }
}