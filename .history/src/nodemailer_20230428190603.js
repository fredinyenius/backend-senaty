import nodemailer from 'nodemailer';


enviarMailer = async () => {

    const config = {
        host :'connection.gamil.com',
        port : 3000,
        auth : {
            user:'fredy.mamani.canahua@gmail.com',
            pass: 'bygnprqhmzowflma'
        }
    }
    const mensaje = {
        from : 'fredy.mamani.canahua@gmail.com',
        to: 'fredy.mamani.canahua@gmail.com',
        subject : 'correo de pruebas',
        text: 'Envio de correo des node'
    }
    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);

   console.log(info)
}
enviarMail()