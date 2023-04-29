
const swaggerJSDoc =require("swagger-jsdoc");
const swaggerUi =require("swagger-ui-express");
const  express  =  require ( 'express' ) ; 
const  app  =  express ( ) ; 
const  swaggerDocument  =  require ( './swagger.json' ) ;


const options = {
    definition : {
        openapi: "3.0.0",
        info: { title: "Tienda API", version: "1.0.0"},
    },
    apis: ["src/v1/routes/productos.routes.js"],

};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/productos', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('productos.json',(req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Version 1 Docs are avalilable at http://localhost:${port}/api/v1/doc`);
};

module.exports = { swaggerDocs };