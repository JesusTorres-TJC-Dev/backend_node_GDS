import { mail, transporter } from "../config/Mail.config";

const getTemplate = (user_name: string, user_token_verify: string, user_role: string) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://i.imgur.com/eboNR82.png" alt="">
          <h2>Hola ${ user_name }</h2>
          <p>Para confirmar tu cuenta de ${user_role}, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:30001/api/auth/verify/${ user_token_verify }"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
}

const sendEmail = async (user_email: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `GDS <${ mail.user }>`, // sender address
            to: user_email, // list of receivers
            subject, // Subject line
            text: "Hola amigos, suscríbance para más videos", // plain text body
            html, // html body
        })
    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}

export {
    getTemplate,
    sendEmail,
}