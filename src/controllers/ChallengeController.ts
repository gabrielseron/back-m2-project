import { Request, Response } from 'express';
import { verify, decode } from 'jsonwebtoken';
import User from '../models/User';
import Challenge from '../models/Challenge';
import Exercise from '../models/Exercise';
import { NodeSSH } from 'node-ssh';
const path = require('path');

const split = (token: string) => { return token.split('Bearer ').join('') }

export class ChallengeController
{
    static execute = async(req: Request, res: Response) =>
    {
        let data: any = req.body;
        let user: any;
        let result: any;
        try {
            user = await ( < any > decode(data.token as string)).user;

            const ssh = new NodeSSH();

            const connect = {
                host: data.host,
                username: data.username,
                privateKey: data.privateKey
            }

            await ssh.connect(connect)
            .then(() => {
                console.log('Le challenge peut commencer')
                const basePath = path.basename(`/home/${connect.username}/.ssh/authorized_keys`)
                if (path.join = "/home", ".ssh", "authorized_keys") {
                    result = `There is a file named ${basePath}`;
                }
            })

            res.status(201).json({user, result});
        } catch (error) {
            return res.status(401).json({ error: true, message: `An error has occured : ${error}` }).end();
        }
    }
}