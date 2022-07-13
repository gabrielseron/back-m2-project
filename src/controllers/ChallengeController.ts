import { Request, Response } from 'express';
import { verify, decode } from 'jsonwebtoken';
import User from '../models/User';
import Results from '../models/Results';
import { Client } from 'ssh2';
import { readFileSync } from 'fs';

const path = require('path');

const split = (token: string) => { return token.split('Bearer ').join('') }
export class ChallengeController
{

    static isConnected = async(req: Request, res: Response) =>
    {
        let score = 0
        let data: any = req.body;
        let user: any;
        let result: any;
        console.log(data);
        const connConfig = {
            host: data.host,
            port: 22,
            username: data.username,
            readyTimeout: 1000,
            handShake: true,
            privateKey: readFileSync("C:/Users/ggggb/.ssh/id_rsa")
        }

        function exerciseOne() {
            return new Promise((resolve, reject) => {
                try {
                    const conn = new Client();
                    conn.on('ready', () => {
                        console.log('Client :: ready');
                        conn.exec('uptime', (err, stream) => {
                            if (err) throw err;
                            stream.on('close', (code: any, signal: any) => {
                                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                                conn.end();
                            }).on('data', (data: any) => {
                                console.log('STDOUT: ' + data);
                            }).stderr.on('data', (data) => {
                                console.log('STDERR: ' + data);
                            })
                        });
                        score = 1;
                        resolve({error: false})
                    }).connect(connConfig);
                    conn.on('error', (err: any) => {
                        score = 0;
                        console.log("", err.message)
                        reject ({ error: true, message: `An error has occured : ${err.message}`, score, tips: "La connexion n'a pas pu être établie ! Vérifie les identifiants de connexion !" })
                })
                } catch (err: any) {
                    reject ({ error: true, message: `An error has occured : ${err.message}`, score, tips: "La connexion n'a pas pu être établie ! Vérifie les identifiants de connexion !" })
                }
            })
        }

        try {
            await exerciseOne()
            return res.status(201).json({connected: true}).end();
        } catch (error) {
            console.log(error);
            console.log(score);
            return res.status(401).json(error).end();
        }
    }

    static execute = async(req: Request, res: Response) =>
    {
        let score = 0
        let data: any = req.body;
        console.log(data);
        const connConfig = {
            host: data.host,
            port: 22,
            username: data.username,
            readyTimeout: 1000,
            handShake: true,
            privateKey: readFileSync("C:/Users/ggggb/.ssh/id_rsa")
        }

        function exerciseOne() {
            return new Promise((resolve, reject) => {
                try {
                    const conn = new Client();
                    conn.on('ready', () => {
                        console.log('Client :: ready');
                        conn.exec('uptime', (err, stream) => {
                            if (err) throw err;
                            stream.on('close', (code: any, signal: any) => {
                                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                                conn.end();
                            }).on('data', (data: any) => {
                                console.log('STDOUT: ' + data);
                            }).stderr.on('data', (data) => {
                                console.log('STDERR: ' + data);
                            })
                        });
                        score = 10;
                        resolve({error: false})
                    }).connect(connConfig);
                    conn.on('error', (err: any) => {
                        score = 0;
                        console.log("", err.message)
                        // return res.end(`<h1>Welcome ${connConfig.username}, voici ton score ${score}</h1>`)
                        reject ({ error: true, message: `An error has occured : ${err.message}`, score, tips: "La connexion n'a pas pu être établie ! Vérifie les identifiants de connexion !" })
                })
                } catch (err: any) {
                    reject ({ error: true, message: `An error has occured : ${err.message}`, score, tips: "La connexion n'a pas pu être établie ! Vérifie les identifiants de connexion !" })
                }
            })
        }
        
        function exerciseTwo() {
            return new Promise((resolve, reject) => {
                try {
                    const filePath = path.join('/content/', 'subfolder', 'hello.txt');
                    const baseContent = path.basename(filePath);
                    if (baseContent == 'hello.txt') {
                        console.log(`Well done the txt file is right! \n the next exercises are planned in a DLC that will be released very soon!`);
                        score = 20;
                    } else {
                        reject ({ error: true, score, tips: "Le fichier hello.txt n'existe pas ou n'est pas au bon emplacement !" })
                    }
                    reject ({error: false, score})
                } catch (err: any) {
                    reject ({ error: true, message: `An error has occured : ${err.message}`, score, tips: "Le fichier hello.txt n'existe pas ou n'est pas au bon emplacement !" })
                }
            })
        }


        try {
            await exerciseOne()
            await exerciseTwo()
        } catch (error) {
            const user = await ( < any > decode(data.token)).user
            console.log(user);
            let result
            if (await Results.isExiste(user.id_user))
                result = await Results.setScore( {'id_user': user.id_user}, {result: score});
            else {
                result = new Results(1, score, user.id);
                await result.save()
            }

            return res.status(401).json(error).end();
        }
    }

}