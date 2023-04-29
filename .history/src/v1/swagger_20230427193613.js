
const swaggerJSDoc =require("swagger-jsdoc")
const swaggerUi =require("swagger-ui-express")
const path = require("path")

const options = {
    definition : {
        openapi: "3.0.0",
        info: { 
            title: "Tienda API", version: "1.0.0"
        },
        server: [{
            url:"http://localhost:9000"
        }
            
        ]
    },
    apis: [`${path.join(__dirname,"routes/*.js")}`],

};

const swaggerSpec = swaggerJSDoc(options);

const SwaggerDocs = (app, port) => {
    servidor.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    servidor.get('/api/v1/docs.json',(req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Version 1 Docs are avalilable at http://localhost:${port}/api/v1/doc`);
};

module.exports = { swaggerDocs };