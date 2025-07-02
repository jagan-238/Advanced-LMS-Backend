const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Advanced LMS API",
      version: "1.0.0",
      description: "Backend APIs for Advanced Learning Management System"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
