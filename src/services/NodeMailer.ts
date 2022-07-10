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
                subject: 'Validate Email',
                text: `<h3>Click on the link to verify your email</h3><br /><a href=${process.env.FRONT_URL}/auth/verifEmail/${token}>${process.env.FRONT_URL}/auth/verifEmail/${token}</a>`
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
                subject: 'Reset Password',
                text: `<h3>Click on the link to reset your password, the link will expire in 5 minutes</h3><br /><a href=${process.env.FRONT_URL}/auth/resetPassword/${token}>${process.env.FRONT_URL}/auth/resetPassword/${token}</a>`
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