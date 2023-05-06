import nodemailer from 'nodemailer';


 export const enviarMailer = async () => {

    const config = {
        host :'gmail',
        port : 465,
        secure: true,
        auth : {
            user:'fredy.mamani.canahua@gmail.com',
            pass: 'bygnprqhmzowflma'
        }
    }
    const mensaje = {
        from : 'fredy.mamani.canahua@gmail.com',
        to: 'fredy.mamani.canahua@gmail.com',
        subject : 'correo de pruebas',
        html:`<h1>Correo de pruebas</h1>`
    }
    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);

   console.log(info)
}

enviarMailer()
