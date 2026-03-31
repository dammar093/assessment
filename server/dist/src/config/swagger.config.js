import swaggerJSDoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tech Craft API",
            version: "1.0.0",
            description: "API documentation for your backend",
        },
        servers: [
            {
                url: process.env.APP_URL,
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
export const swaggerSpec = swaggerJSDoc(options);
//# sourceMappingURL=swagger.config.js.map