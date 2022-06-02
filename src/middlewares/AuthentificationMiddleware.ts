import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

import EmailException from '../exceptions/EmailException';
import PasswordException from '../exceptions/PasswordException';

const split = (token: string) => { return token.split('Bearer ').join('') }

export const authMiddleware = (req: Request, res: Response, next: () => void) =>
{
    try {
        if (req.headers.authorization && verify(split(req.headers.authorization), < string > process.env.JWT_KEY))
            return next()
        else
            throw new Error(`Authorization not found`)
    } catch (error) {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
    }
}

export const registerMiddleware = (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;

    //todo change fields
    const champsRequire = [`nameUser`, `mailUser`, `passUser`, `rePassUser`]

    try
    {
        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire)
        {
            error = true;
            for (const champs in data)
            {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }
        if (textError.length > 0)
        {
            textError = textError.slice(0, -2);
            throw new Error(`Les champs ${textError} sont manquant!`)
        }

        if (champsRequire[2] !== champsRequire[3])
            throw new Error(`Les mots de passe ne correspondent pas`)

        if (EmailException.checkEmail(data.mailUser))
            throw new EmailException();
        if (!PasswordException.isValidPassword(data.passUser))
            throw new PasswordException();

        next()


    } catch (error)
    {
        return res.status(401).json( {error: true, message: (error as any).message}).end();
    }
}

export const loginMiddleware = (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;

    //todo change fields
    const champsRequire = [`mailUser`, `passUser`]

    try
    {
        let error: boolean = true;
        let textError: string = '';
        for (const require in champsRequire)
        {
            error = true;
            for (const champs in data)
            {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }

        if (textError.length > 0)
        {
            textError = textError.slice(0, -2); // Delete ', '
            throw new Error(`${textError} is missing`)
        }

        if (EmailException.checkEmail(data.mailUser)) // Check valid syntaxe email
            throw new EmailException();
        
        if (!PasswordException.isValidPassword(data.passUser)) // Check valid syntaxe password
            throw new PasswordException();

        next()

    } catch (error)
    {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
    }
}