const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://smart-inventory-api-kbg9.onrender.com/api"
    : "http://localhost:5000/api";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Inventory Management API",
      version: "1.0.0",
      description: "API documentation for Smart Inventory Management System",
    },
    servers: [
      {
        url: serverUrl,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["src/docs/**/*.ts", "src/controllers/**/*.ts", "src/schemas/**/*.ts"],
};

export default options;
