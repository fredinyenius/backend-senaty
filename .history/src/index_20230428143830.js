import express from "express";
import cors from "cors";
import { usuarioRouter } from "./routes/usuarios.routes.js";
import { productoRouter } from "./routes/productos.routes.js";
import { categoriaRouter } from "./routes/categorias.routes.js";
import dotenv from "dotenv";

// utilizando todas las variables definidas en el archivo .env como si fueran variables de entorno
import swaggerJSDoc from "swagger-jsdoc";

import  swaggerUi  from "swagger-ui-express";

dotenv.config();

//Swagger
const options = {
  definition : {
      openapi: "3.0.0",
      info: { 
          title: "Tienda API", version: "1.0.0"
      },
      servers: [{
          url:"http://localhost:3000"
      }
          
      ]
  },
  apis: ["./src/documentacion/*.yml"],

};
const swaggerSpec = swaggerJSDoc(options)
//-----------------------------------

const servidor = express();
const PORT = 3000;

servidor.use(cors());
servidor.use(express.json());
servidor.use(usuarioRouter);
servidor.use(productoRouter);
servidor.use(categoriaRouter);

servidor.use('/api',productoRouter);
servidor.use('/api-docs',productoRouter, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
servidor.get("/", (req, res) => {
  res.set("Welcome to my api")
});

servidor.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});