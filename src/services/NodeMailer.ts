import { createTransport } from 'nodemailer'; 

export default abstract class NodeMailerApi
{
    static verifEmail(email: string, token: string) 
    {
        return new Promise((resolve, reject) =>
        {
            const mailTransporter = createTransport(
            {
                service: 'Outlook365',
                auth: {
                    user: process.env.NODEMAILEREMAIL,
                    pass: process.env.NODEMAILERPASS
                }
            });
            let mailDetails =
            {
                from: process.env.NODEMAILEREMAIL,
                to: email,
                subject: "Vérification de l'adresse E-mail",
                text: `<h3>Cliquez sur le lien pour vérifier votre adresse E-mail</h3><br /><a href=${process.env.FRONT_URL}/auth/verifEmail/${token}>${process.env.FRONT_URL}/auth/verifEmail/${token}</a>`
            };
            
            mailTransporter.sendMail(mailDetails, function(err, data)
            {
                if(err) {
                    console.log(err);
                    reject(false)
                } else {
                    resolve(data)
                }
            });
        })
    }

    static resetPassword(email: string, token: string) 
    {
        return new Promise((resolve, reject) =>
        {
            const mailTransporter = createTransport(
            {
                service: 'Outlook365',
                auth: {
                    user: process.env.NODEMAILEREMAIL,
                    pass: process.env.NODEMAILERPASS
                }
            });

            let mailDetails =
            {
                from: process.env.NODEMAILEREMAIL,
                to: email,
                subject: 'Réinitialisation de votre mot de passe',
                text: `<h3>Cliquez sur le lien pour réinitialiser votre mot de passe, attention ce lien expirera dans 5 minutes</h3><br /><a href=${process.env.FRONT_URL}/auth/resetPassword/${token}>${process.env.FRONT_URL}/auth/resetPassword/${token}</a>`
            };

            mailTransporter.sendMail(mailDetails, function(err, data)
            {
                if(err) {
                    console.log(err);
                    reject(false)
                } else {
                    resolve(data)
                }
            });
        })
    }
}