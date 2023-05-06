import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

 export const subirImagen = (ubicacion) => {
    const s3 = new S3()({
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS,
        },
    });

    const fileStream = fs.createReadStream("./piscina.jpg");

    s3.upload({
        Bucket: process.env.AWS_ACCESS_NAME,
        Body: fileStream,
        Key: "piscina.jpg",
    }).promise();

    return archivoSubido;
};