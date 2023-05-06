import nodemailer from 'nodemailer';


 export const enviarMailer = async () => {

    const config = {
        service :'gmail',
        auth : {
            user:'fredy.mamani.canahua@gmail.com',
            pass: 'bygnprqhmzowflma'
        }
    }
    const mensaje = {
        from : 'fredy.mamani.canahua@gmail.com',
        to: 'fredy.mamani.canahua@gmail.com',
        subject : 'correo de pruebas',
        html:`<h1>Correo enviado</h1>`
    }
    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);

   console.log(info)
};

