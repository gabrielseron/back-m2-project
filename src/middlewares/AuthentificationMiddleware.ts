import { verify, decode } from 'jsonwebtoken';
import { Request, Response } from 'express';

import EmailException from '../exceptions/EmailException';
import PasswordException from '../exceptions/PasswordException';

const split = (token: string) => { return token.split('Bearer ').join('') }

export const authAdminMiddleware = async (req: Request, res: Response, next: () => void) =>
{
    try {
        if (req.headers.authorization && verify(split(req.headers.authorization), < string > process.env.JWT_KEY)) {
            const isAdmin = await ( < any > decode(req.headers.authorization)).user.is_admin;
            if (await (isAdmin)) {
                next();
            } else {
                return res.status(401).json({isAdmin: false, message: 'Vous n\'êtes pas autorisé à accèder à cette ressource'}).end();
            }
        }
        else
            throw new Error(`Autorisation introuvable`)
    } catch (error) {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
    }
}

export const authAdminMiddlewareFinish = async (req: Request, res: Response) =>
{
    try {
        if (req.headers.authorization && verify(split(req.headers.authorization), < string > process.env.JWT_KEY)) {
            const isAdmin = await ( < any > decode(req.headers.authorization)).user.is_admin;
            if (await (isAdmin)) {
                return res.status(201).json({isAdmin: true, isLogged: true, message: 'Success'}).end();
            } else {
                return res.status(401).json({isAdmin: false, message: 'Vous n\'êtes pas autorisé à accèder à cette ressource'}).end();
            }
        }
        else
            throw new Error(`Autorisation introuvable`)
    } catch (error) {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
    }
}

export const authMiddleware = (req: Request, res: Response, next: () => void) =>
{
    try {
        if (req.headers.authorization && verify(split(req.headers.authorization), < string > process.env.JWT_KEY))
            return next()
        else
            throw new Error(`Autorisation introuvable`)
    } catch (error) {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
    }
}

export const refreshMiddleware = (req: Request, res: Response, next: () => void) =>
{
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        return res.status(401).json( {error: true, message: 'Tokken Error'}).end();
    }

    next();
}

export const registerMiddleware = (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;
    const champsRequire = [`email`, `password`, `rePassword`, `id_promo`]

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
            throw new Error(`Les champs ${textError} sont manquant !`)
        }

        if (data.password !== data.rePassword)
            throw new Error(`Les mots de passe ne correspondent pas`)

        if (EmailException.checkEmail(data.email))
            throw new EmailException();
        if (!PasswordException.isValidPassword(data.password))
            throw new PasswordException();

        if (typeof data.id_promo !== "number") {
            throw new Error(`Promo invalide`)
        }
        next()


    } catch (error)
    {
        return res.status(400).json( {error: true, message: (error as any).message}).end();
    }
}

export const loginMiddleware = (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;
    const champsRequire = [`email`, `password`]

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
            throw new Error(`${textError} est manquant`)
        }

        if (EmailException.checkEmail(data.email)) // Check valid syntaxe email
            throw new EmailException();
        
        if (!PasswordException.isValidPassword(data.password)) // Check valid syntaxe password
            throw new PasswordException();

        next()

    } catch (error)
    {
        return res.status(400).json({ error: true, message: (error as any).message }).end();
    }
}

export const verifEmailMiddleware = (req: Request, res: Response, next: () => void) =>
{
    try {
        if (req.params.token && verify(split(req.params.token), < string > process.env.JWT_KEY))
            next()
        else
            throw new Error(`Token invalide`)
    } catch (error) {
        return res.status(401).json({ error: true, message: (error as any).message }).end();
    }
}


export const resetPasswordMiddleware = (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;
    const champsRequire = [`email`]

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

        if (EmailException.checkEmail(data.email))
            throw new EmailException();
        next()

    } catch (error)
    {
        return res.status(400).json( {error: true, message: (error as any).message}).end();
    }
}

export const changePasswordMiddleware = async (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;
    const champsRequire = [`token`, `password`, `rePassword`]

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

        if (!verify(split(data.token), < string > process.env.JWT_KEY))
            throw new Error(`Token invalide`)

        console.log('a');

        if (await ( < any > decode(data.token)).reason !== 'resetPassword')
            throw new Error(`Token invalide`)

        if (data.password !== data.rePassword)
            throw new Error(`Les mots de passe ne correspondent pas`)

        if (!PasswordException.isValidPassword(data.password))
            throw new PasswordException();

        next()

    } catch (error)
    {
        return res.status(400).json( {error: true, message: (error as any).message}).end();
    }
}


