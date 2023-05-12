import express from "express";
import cors from "cors";
import { usuarioRouter } from "./routes/usuarios.routes.js";
import { productoRouter } from "./routes/productos.routes.js";
import dotenv from "dotenv";
//import { swaggerDocs } from "./v1/swagger.js";
import swaggerUi from "swagger-ui-express"
//const { swaggerDocs : V1SwaggerDocs } = import ('./v1/swagger');

// utilizando todas las variables definidas en el archivo .env como si fueran variables de entorno
dotenv.config();


const servidor = express();
const PORT = 3000;

servidor.use(cors());
servidor.use(express.json());
servidor.use(usuarioRouter);
servidor.use(productoRouter);

servidor.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});