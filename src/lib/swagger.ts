import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Inventory API",
      version: "1.0.0",
      description: "API for managing inventory in small retail stores",
    },
    servers: [{ url: "http://localhost:5000/api" }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
