import nodemailer from 'nodemailer';


enviarMailer = () => {

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

    const info = transport.sendMail(mensaje);


}
enviarMail()