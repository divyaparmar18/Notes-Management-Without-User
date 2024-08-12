import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes Taking API",
      version: "1.0.0",
      description: "API documentation for Notes Management service",
    },
    tags: [
      {
        name: "Notes Management",
        description: "Notes related operations",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;
