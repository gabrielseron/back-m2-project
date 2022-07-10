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
                // text: `<h3>Click on the link to verify your email</h3><br /><a href=${process.env.FRONT_URL}/auth/verifEmail/${token}>${process.env.FRONT_URL}/auth/verifEmail/${token}</a>`
                text: `<!DOCTYPE html>

                <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                
                <head>
                    <title></title>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                    <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css" />
                    <!--<![endif]-->
                    <style>
                        * {
                            box-sizing: border-box;
                        }
                
                        body {
                            margin: 0;
                            padding: 0;
                        }
                
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: inherit !important;
                        }
                
                        #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                        }
                
                        p {
                            line-height: inherit
                        }
                
                        .desktop_hide,
                        .desktop_hide table {
                            mso-hide: all;
                            display: none;
                            max-height: 0px;
                            overflow: hidden;
                        }
                
                        @media (max-width:670px) {
                            .desktop_hide table.icons-inner {
                                display: inline-block !important;
                            }
                
                            .icons-inner {
                                text-align: center;
                            }
                
                            .icons-inner td {
                                margin: 0 auto;
                            }
                
                            .image_block img.big,
                            .row-content {
                                width: 100% !important;
                            }
                
                            .mobile_hide {
                                display: none;
                            }
                
                            .stack .column {
                                width: 100%;
                                display: block;
                            }
                
                            .mobile_hide {
                                min-height: 0;
                                max-height: 0;
                                max-width: 0;
                                overflow: hidden;
                                font-size: 0px;
                            }
                
                            .desktop_hide,
                            .desktop_hide table {
                                display: table !important;
                                max-height: none !important;
                            }
                        }
                    </style>
                </head>
                
                <body style="background-color: #85a4cd; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #85a4cd;" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        class="row-content stack" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;"
                                                        width="650">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                    width="100%">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="heading_block" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:10px;text-align:center;width:100%;padding-top:60px;">
                                                                                <h1
                                                                                    style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 30px; font-weight: normal; letter-spacing: 2px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                                    <strong>VERIFY YOUR EMAIL !</strong></h1>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="image_block" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                                <div align="center" style="line-height:10px"><img
                                                                                        alt="Wrong Password Animation" class="big"
                                                                                        src="https://boostroyal.s3.eu-central-1.amazonaws.com/email_img_v2/checkmark.gif"
                                                                                        style="display: block; height: auto; border: 0; width: 400px; max-width: 100%;"
                                                                                        title="Wrong Password Animation" width="400" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:25px;">
                                                                                <div style="font-family: sans-serif">
                                                                                    <div class="txtTinyMce-wrapper"
                                                                                        style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                        <p
                                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                                            <span style="font-size:20px;">Your account is
                                                                                                almost complete!</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:5px;">
                                                                                <div style="font-family: sans-serif">
                                                                                    <div class="txtTinyMce-wrapper"
                                                                                        style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                        <p
                                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                                            <span style="font-size:22px;">You just need to
                                                                                                confirm your email !</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="button_block" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:30px;text-align:center;">
                                                                                <div align="center">
                                                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:60px;width:258px;v-text-anchor:middle;" arcsize="17%" strokeweight="1.5pt" strokecolor="#3F4D75" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#3f4d75; font-family:Arial, sans-serif; font-size:18px"><![endif]--><a
                                                                                        href=${process.env.FRONT_URL}/auth/verifEmail/${token}
                                                                                        style="text-decoration:none;display:inline-block;color:#3f4d75;background-color:#ffffff;border-radius:10px;width:auto;border-top:2px solid #3F4D75;font-weight:undefined;border-right:2px solid #3F4D75;border-bottom:2px solid #3F4D75;border-left:2px solid #3F4D75;padding-top:10px;padding-bottom:10px;font-family:Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"
                                                                                        target="_blank"><span
                                                                                            style="padding-left:25px;padding-right:25px;font-size:18px;display:inline-block;letter-spacing:normal;"><span
                                                                                                style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span
                                                                                                    data-mce-style="font-size: 18px; line-height: 36px;"
                                                                                                    style="font-size: 18px; line-height: 36px;">Confirm
                                                                                                    MY EMAIL</span></span></span></a>
                                                                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- End -->
                </body>
                </html>`
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
                text: `<!DOCTYPE html>

                <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                
                <head>
                    <title></title>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                    <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css" />
                    <!--<![endif]-->
                    <style>
                        * {
                            box-sizing: border-box;
                        }
                
                        body {
                            margin: 0;
                            padding: 0;
                        }
                
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: inherit !important;
                        }
                
                        #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                        }
                
                        p {
                            line-height: inherit
                        }
                
                        .desktop_hide,
                        .desktop_hide table {
                            mso-hide: all;
                            display: none;
                            max-height: 0px;
                            overflow: hidden;
                        }
                
                        @media (max-width:670px) {
                            .desktop_hide table.icons-inner {
                                display: inline-block !important;
                            }
                
                            .icons-inner {
                                text-align: center;
                            }
                
                            .icons-inner td {
                                margin: 0 auto;
                            }
                
                            .image_block img.big,
                            .row-content {
                                width: 100% !important;
                            }
                
                            .mobile_hide {
                                display: none;
                            }
                
                            .stack .column {
                                width: 100%;
                                display: block;
                            }
                
                            .mobile_hide {
                                min-height: 0;
                                max-height: 0;
                                max-width: 0;
                                overflow: hidden;
                                font-size: 0px;
                            }
                
                            .desktop_hide,
                            .desktop_hide table {
                                display: table !important;
                                max-height: none !important;
                            }
                        }
                    </style>
                </head>
                
                <body style="background-color: #85a4cd; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #85a4cd;" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        class="row-content stack" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;"
                                                        width="650">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                    width="100%">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="heading_block" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:10px;text-align:center;width:100%;padding-top:60px;">
                                                                                <h1
                                                                                    style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 30px; font-weight: normal; letter-spacing: 2px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                                    <strong>FORGOT YOUR PASSWORD?</strong></h1>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="image_block" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                                <div align="center" style="line-height:10px"><img
                                                                                        alt="Wrong Password Animation" class="big"
                                                                                        src="https://cdn.discordapp.com/attachments/816307837214392370/995737186806808586/GIF_password.gif"
                                                                                        style="display: block; height: auto; border: 0; width: 500px; max-width: 100%;"
                                                                                        title="Wrong Password Animation" width="500" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:25px;">
                                                                                <div style="font-family: sans-serif">
                                                                                    <div class="txtTinyMce-wrapper"
                                                                                        style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                        <p
                                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                                            <span style="font-size:20px;">Don't worry,
                                                                                                be happy!</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:5px;">
                                                                                <div style="font-family: sans-serif">
                                                                                    <div class="txtTinyMce-wrapper"
                                                                                        style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                        <p
                                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                                            <span style="font-size:22px;">Let's get you
                                                                                                a new password.</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="button_block" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:30px;text-align:center;">
                                                                                <div align="center">
                                                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:60px;width:258px;v-text-anchor:middle;" arcsize="17%" strokeweight="1.5pt" strokecolor="#3F4D75" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#3f4d75; font-family:Arial, sans-serif; font-size:18px"><![endif]--><a
                                                                                        href=${process.env.FRONT_URL}/auth/resetPassword/${token}
                                                                                        style="text-decoration:none;display:inline-block;color:#3f4d75;background-color:#ffffff;border-radius:10px;width:auto;border-top:2px solid #3F4D75;font-weight:undefined;border-right:2px solid #3F4D75;border-bottom:2px solid #3F4D75;border-left:2px solid #3F4D75;padding-top:10px;padding-bottom:10px;font-family:Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"
                                                                                        target="_blank"><span
                                                                                            style="padding-left:25px;padding-right:25px;font-size:18px;display:inline-block;letter-spacing:normal;"><span
                                                                                                style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span
                                                                                                    data-mce-style="font-size: 18px; line-height: 36px;"
                                                                                                    style="font-size: 18px; line-height: 36px;">RESET
                                                                                                    MY PASSWORD</span></span></span></a>
                                                                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td
                                                                                style="padding-bottom:40px;padding-left:10px;padding-right:10px;padding-top:30px;">
                                                                                <div style="font-family: sans-serif">
                                                                                    <div class="txtTinyMce-wrapper"
                                                                                        style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                        <p
                                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                                            <span style="font-size:14px;">If you didn’t
                                                                                                request to change your password, simply
                                                                                                ignore this email.</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                                        role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c4d6ec;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        class="row-content stack" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;"
                                                        width="650">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                    width="100%">
                                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                                        class="text_block" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td>
                                                                                <div style="font-family: sans-serif">
                                                                                    <div class="txtTinyMce-wrapper"
                                                                                        style="font-size: 14px; mso-line-height-alt: 16.8px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                        <p
                                                                                            style="margin: 0; font-size: 14px; text-align: center;">
                                                                                            <span style="font-size:12px;">This link
                                                                                                will expire in 15 minutes. If you continue
                                                                                                to have problems</span><br /><span
                                                                                                style="font-size:12px;">please feel free
                                                                                                to contact us at <a
                                                                                                    href="jean.dev.hetic.MT4@outlook.fr"
                                                                                                    rel="noopener"
                                                                                                    style="text-decoration: underline; color: #ffffff;"
                                                                                                    target="_blank"
                                                                                                    title="jean.dev.hetic.MT4@outlook.fr">jean.dev.hetic.MT4@outlook.fr</a>.
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                                        role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3f6fe;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        class="row-content stack" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;"
                                                        width="650">
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- End -->
                </body>
                
                </html>`
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