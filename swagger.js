const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "dakku-dakku",
      version: "1.0.0",
      description: "dakku-dakku with express",
    },
    host: "localhost:5000",
    basePath: "/",
  },
  apis: ["./server/router/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
