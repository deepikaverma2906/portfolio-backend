const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "Dynamic Portfolio API using Node.js, Express, and MongoDB",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger will read JSDoc comments from these files
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
