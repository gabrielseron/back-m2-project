import { Request, Response } from 'express';

export const challengeMiddleware = async (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;
    const champsRequire = [`privateKey`, `host`, `username`, `token`]

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

        next()

    } catch (error)
    {
        return res.status(400).json( {error: true, message: (error as any).message}).end();
    }
}