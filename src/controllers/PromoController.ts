import { Request, Response } from 'express';
import Promo from '../models/Promo';
import User from '../models/User';
export class PromoController
{

    static getAll = async(req: Request, res: Response) =>
    {
        let promo: any;

        try {
            promo = await Promo.selectAll();
            return res.status(201).json(promo);
        } catch (error) {
            return res.status(401).json({ error: true, message: `Une erreur est survenue : ${error}` }).end();
        }
    }

    static create = async(req: Request, res: Response) =>
    {
        let data: any = req.body;

        try {
            if (await Promo.isExiste('promo_name', data.promo_name))
                throw new Error(`Cette promo existe déjà !`)

            const promo = new Promo(null, data.promo_name)
            await promo.save();

            return res.status(201).json({message: 'Opération réussie avec succès'});
        } catch (error) {
            return res.status(401).json({ error: true, message: `Une erreur est survenue : ${error}` }).end();
        }
    }

    static getUsers = async(req: Request, res: Response) =>
    {
        let id: any = parseInt(req.params.id, 10);
        let users: any;
        try {
            if (!await Promo.isExiste('id_promo', id))
                throw new Error(`Cette promo n'existe pas`)

            users = await User.selectAll(id, {id_promo: id});
            return res.status(201).json({users});
        } catch (error) {
            return res.status(401).json({ error: true, message: `Une erreur est survenue : ${error}` }).end();
        }
    }
    
}