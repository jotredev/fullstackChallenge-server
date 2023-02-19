import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentation API fullstackChallenge",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:4000/api/v1",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      login: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      createUser: {
        type: "object",
        required: ["name", "lastname", "email", "password"],
        properties: {
          name: {
            type: "string",
          },
          lastname: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      permission: {
        type: "object",
        required: ["name", "id_user"],
        properties: {
          name: {
            type: "string",
          },
          id_user: {
            type: "integer",
          },
        },
      },
      posts: {
        type: "object",
        required: ["title", "desc", "created_by"],
        properties: {
          title: {
            type: "string",
          },
          desc: {
            type: "string",
          },
          created_by: {
            type: "integer",
          },
        },
      },
      reviews: {
        type: "object",
        required: ["name", "comment", "id_post"],
        properties: {
          name: {
            type: "string",
          },
          comment: {
            type: "string",
          },
          id_post: {
            type: "integer",
          },
        },
      },
      logs: {
        type: "object",
        required: ["description"],
        properties: {
          description: {
            type: "string",
          },
        },
      },
    },
  },
};

const options = {
  failOnErrors: true,
  swaggerDefinition,
  apis: ["./src/routes/v1/*.js"],
};

const openApiConfig = swaggerJsdoc(options);

export default openApiConfig;
