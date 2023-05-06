import express from "express";
import cors from "cors";
import { usuarioRouter } from "./routes/usuarios.routes.js";
import { productoRouter } from "./routes/productos.routes.js";
import dotenv from "dotenv";
//import { swaggerDocs } from "./v1/swagger.js";
//import swaggerUi from "swagger-ui-express"
//const { swaggerDocs : V1SwaggerDocs } = import ('./v1/swagger');

// utilizando todas las variables definidas en el archivo .env como si fueran variables de entorno
import swaggerJSDoc from "swagger-jsdoc";
//const swaggerJSDoc = require("swagger-jsdoc")
import  swaggerUi  from "swagger-ui-express";
//const swaggerUi = require("swagger-ui-express")
import path from "path";
//const path = require("path")
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
  apis: [__dirname+"./routes/*.js"],

};

const swaggerSpec = swaggerJSDoc(options)
console.log(swaggerSpec)
console.log(options)

//-----------------------------------

const servidor = express();
const PORT = 3000;

servidor.use(cors());
servidor.use(express.json());
servidor.use(usuarioRouter);
servidor.use(productoRouter);

//servidor.use('/api',productoRouter);
servidor.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
servidor.get("/", (req, res) => {
  res.setEncoding("Welcome to my api")
});

servidor.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});