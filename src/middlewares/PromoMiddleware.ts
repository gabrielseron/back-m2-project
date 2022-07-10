import { Request, Response } from 'express';
// 

export const PostPromoMiddleware = async (req: Request, res: Response, next: () => void) =>
{
    let data: any = req.body;
    const champsRequire = [`promo_name`]

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

        if (typeof data.promo_name !== "string") {
            throw new Error(`Promo invalide`)
        }
        next()

    } catch (error)
    {
        return res.status(400).json( {error: true, message: (error as any).message}).end();
    }
}

export const GetPromoUsersMiddleware = async (req: Request, res: Response, next: () => void) => {
    try {
        if (!req.params.id || isNaN(req.params.id as any))
            throw new Error(`Invalid Id`)

        next()

    } catch (error) {
        return res.status(400).json( {error: true, message: (error as any).message}).end();
    }

}