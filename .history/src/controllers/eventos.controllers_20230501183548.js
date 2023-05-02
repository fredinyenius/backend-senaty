import { subirImagenes } from "../utils/s3";

export const probarS3 = async (req, res) => {
    const resultado = await subirImagenes("");
    console.log(resultado);

    res.json({
        message: "Archivo subido exitosamente",
    });
};