// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Fastify from "fastify";
import { authenticateToken } from "../src/auth.js";

describe("authenticateToken plugin", () => {
  let fastify: ReturnType<typeof Fastify>;
  const validToken = "testtoken123";
  const invalidToken = "invalidtoken";

  beforeEach(async () => {
    // Set up environment variable for each test
    process.env.TURBO_TOKEN = validToken;
    fastify = Fastify();
    fastify.addHook("preHandler", authenticateToken);
    // Add a test route
    fastify.get("/test", async () => ({ ok: true }));
    await fastify.ready();
  });

  afterEach(async () => {
    await fastify.close();
    delete process.env.TURBO_TOKEN;
  });

  it("should allow requests with a valid token", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/test",
      headers: {
        authorization: `Bearer ${validToken}`,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ ok: true });
  });

  it("should reject requests with an invalid token", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/test",
      headers: {
        authorization: `Bearer ${invalidToken}`,
      },
    });
    expect(response.statusCode).toBe(403);
    expect(response.body).toContain("Invalid or unauthorized token");
  });

  it("should reject requests with no token", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/test",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toContain("Access token is missing or invalid");
  });

  it("should return 500 if no tokens are configured", async () => {
    delete process.env.TURBO_TOKEN;
    // Recreate fastify instance to pick up new env
    await fastify.close();
    fastify = Fastify();
    fastify.addHook("preHandler", authenticateToken);
    fastify.get("/test", async () => ({ ok: true }));
    await fastify.ready();

    const response = await fastify.inject({
      method: "GET",
      url: "/test",
      headers: {
        authorization: `Bearer ${validToken}`,
      },
    });
    expect(response.statusCode).toBe(500);
    expect(response.body).toContain("No tokens configured in the environment");
  });
});
