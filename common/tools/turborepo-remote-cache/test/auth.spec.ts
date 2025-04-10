// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import { authenticateToken, authenticateTeamId } from "../src/auth.js";
import type { Request, Response } from "express";

describe("authenticateToken", () => {
  it("should return 401 if the token is missing", () => {
    const req = { headers: {} } as unknown as Request;
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() } as unknown as Response;
    const next = vi.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Access token is missing or invalid.");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 if no tokens are configured in the environment", () => {
    const req = { headers: { authorization: "Bearer test-token" } } as unknown as Request;
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() } as unknown as Response;
    const next = vi.fn();

    delete process.env.TURBO_TOKEN; // No tokens configured
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("No tokens configured in the environment.");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if the token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalid-token" } } as unknown as Request;
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() } as unknown as Response;
    const next = vi.fn();

    process.env.TURBO_TOKEN = "valid-token";
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Invalid or unauthorized token.");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if the token is valid", () => {
    const req = { headers: { authorization: "Bearer valid-token" } } as unknown as Request;
    const res = { status: vi.fn(), send: vi.fn() } as unknown as Response;
    const next = vi.fn();

    process.env.TURBO_TOKEN = "valid-token";
    authenticateToken(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});

describe("authenticateTeamId", () => {
  it("should return 401 if team ID or slug is missing", () => {
    const req = { query: {} } as unknown as Request;
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() } as unknown as Response;
    const next = vi.fn();

    authenticateTeamId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Missing team ID or slug.");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if team ID or slug is present", () => {
    const req = { query: { teamId: "team123" } } as unknown as Request;
    const res = { status: vi.fn(), send: vi.fn() } as unknown as Response;
    const next = vi.fn();

    authenticateTeamId(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
