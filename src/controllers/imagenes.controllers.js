//import { Prisma } from "../prisma.js";
import { subirImagenes, devolverUrlFirmada, eliminarArchivo } from "../utils/s3.js";
import fs from "fs";

export const subirImagen = async (req, res) => {
  const archivo = req.file;
  console.log(req.file);
  //   console.log(req.files);

  const respuesta = await subirImagenes(archivo);
  console.log(respuesta);
  // sirve para eliminar archivos de nuestro proyecto
  fs.unlinkSync(archivo.path);
  // TODO: agregar esa Key al evento al BD
  return res.json({
    message: "Imagen subida exitosamente",
    content: respuesta.Key,
  });
};

export const devolverImagen = (req, res) => {
  const { nombre } = req.params;
  try {
    const url = devolverUrlFirmada(nombre);

    return res.status(200).json({
      content: url,
    });
  } catch (error) {
    return res.status(400).json({
      message: "La imagen no existe",
    });
  }
};

export const eliminarImagen = (req, res) => {
  const { nombre } = req.params;
  eliminarArchivo(nombre);

  return res.status(204).send();
};


const AWS = require('aws-sdk');
const prisma = require('./prisma');

// Configura AWS SDK con tus credenciales y la región de tu bucket S3
const s3 = new AWS.S3({
  accessKeyId: 'TU_ACCESS_KEY_ID',
  secretAccessKey: 'TU_SECRET_ACCESS_KEY',
  region: 'TU_REGION'
});

// Obtiene la ruta de la imagen en S3
const getImageS3Url = (bucket, key) => {
  return `https://${bucket}.s3.${s3.config.region}.amazonaws.com/${key}`;
}

// Guarda la ruta de la imagen en la base de datos utilizando Prisma
const saveImageToDatabase = async (s3Url) => {
  const newImage = await prisma.image.create({
    data: {
      s3Url: s3Url
    }
  });
  return newImage;
}

// Ejemplo de uso
(async () => {
  const s3Url = getImageS3Url('NOMBRE_DE_TU_BUCKET', 'RUTA_DE_TU_IMAGEN_EN_S3');
  const savedImage = await saveImageToDatabase(s3Url);
  console.log(`La imagen con ID ${savedImage.id} ha sido guardada en la base de datos.`);
})();