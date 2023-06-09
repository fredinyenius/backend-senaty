import Stripe from "stripe";
import express from "express";
import cors from "cors";


import { usuarioRouter } from "./routes/usuarios.routes.js";
import { productoRouter } from "./routes/productos.routes.js";
import { categoriaRouter } from "./routes/categorias.routes.js";
import { imagenRouter } from "./routes/imagenes.routes.js";
import { pedidoRouter } from "./routes/pedidos.routes.js";
//import { enviarMailer } from "./nodemailer.js";
import dotenv from "dotenv";

// utilizando todas las variables definidas en el archivo .env como si fueran variables de entorno
import swaggerJSDoc from "swagger-jsdoc";

import swaggerUi from "swagger-ui-express";

dotenv.config();

const stripe = Stripe(process.env.TOKEN_STRIPE);


//Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tienda API", version: "1.0.0"
    },
    servers: [{
      url: "http://localhost:3000"
    },

    ]
  },
  apis: ["./src/documentacion/*.yml"],

};
const swaggerSpec = swaggerJSDoc(options)
//-----------------------------------

const servidor = express();
const PORT = process.env.PORT ?? 3000; //de railway
//const PORT = 3000;

servidor.use(cors());
servidor.use(express.json());

//servidor.use(enviarMailer);
servidor.use(usuarioRouter);
servidor.use(productoRouter);
servidor.use(categoriaRouter);
servidor.use(imagenRouter);
servidor.use(pedidoRouter);

servidor.use('/api', productoRouter);
servidor.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



servidor.post('/api/checkout', async (req,res) => {
 try {
  const { id, amount} = req.body

  const payment =  await stripe.paymentIntents.create({

    amount,
    currency: "USD",
    description: "Productos",
    payment_method: id,
    confirm: true
  })

  console.log(payment)
  res.send({message: 'Succesfull payment'})

 } catch (error) {
  console.log(error);
  res.json({message: error.raw.message});
 }
});

servidor.get("/", (req, res) => {
  res.json({ message: "Welcome tu papá! my api" })
});

servidor.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});