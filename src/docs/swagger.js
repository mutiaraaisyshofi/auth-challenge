const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Backend Auth & Book API",
      version: "1.0.0",
      description: "API Auth dan Manajemen Buku"
    },

    servers: [
      {
        url: "https://auth-challenge-production.up.railway.app/",
        description: "Production Server",
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;