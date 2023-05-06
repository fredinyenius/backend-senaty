const swaggerJSDocs =require("swagger-jsdoc");
const swaggerUi =require("swagger-ui-express");


const options = {
    definition : {
        openapi: "3.0.0",
        info: { title: "Tienda API", version: "1.0.0"},
    },
    apis: ["src/v1/routes/productos.routes.js", "src/v1/routes/productos.controller.js"],

};

const swaggerSpec = swaggerJSDocs(options);

const swaggerJSDocs = (app, port) => {
    app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/doc.json',(req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Version 1 Docs are avalilable at http://localhost:${port}/api/v1/doc`);
};

module.exports = { swaggerDocs };