import request from "supertest";
import app from "../index";

describe("[AUTH] Prueba de /api/auth", () => {
  test("Esto debería retornar un 404", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test@gmail.com",
      password: "test123",
    });

    expect(response.statusCode).toBe(404);
  });

  test("Esto debería retornar un 403", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "admin@example.com",
      password: "admin",
    });

    expect(response.statusCode).toBe(403);
  });

  test("Esto debería retornar un 201", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "admin@example.com",
      password: "admin123",
    });

    expect(response.statusCode).toBe(201);
  });
});
