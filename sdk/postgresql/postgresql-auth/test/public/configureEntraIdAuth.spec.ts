// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, afterEach } from "vitest";
import { configureEntraAuthentication } from "@azure/postgresql-auth";
import {
  createValidJwtToken,
  createJwtTokenWithAppId,
  TestTokenCredential,
  FailingTokenCredential,
  createMockSequelizeInstance,
  TEST_USERS,
} from "./utils/testUtils.js";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("configureEntraAuthentication", () => {
  describe("hook registration", () => {
    it("should register a beforeConnect callback on the sequelize instance", () => {
      const mock = createMockSequelizeInstance();
      const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
      const credential = new TestTokenCredential(token);

      configureEntraAuthentication(mock, credential);

      expect(mock.capturedCallback).toBeDefined();
      expect(typeof mock.capturedCallback).toBe("function");
    });

    it("should not throw when called with valid arguments", () => {
      const mock = createMockSequelizeInstance();
      const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
      const credential = new TestTokenCredential(token);

      configureEntraAuthentication(mock, credential);
    });

    it("should throw when credential is not provided", () => {
      const mock = createMockSequelizeInstance();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => configureEntraAuthentication(mock, null as any)).toThrow(
        "credential is required",
      );
    });
  });

  describe("beforeConnect callback - UPN token", () => {
    it("should set username from UPN claim and password from token", async () => {
      const mock = createMockSequelizeInstance();
      const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
      const credential = new TestTokenCredential(token);

      configureEntraAuthentication(mock, credential);

      const config: { username?: string; password?: string } = {};
      await mock.capturedCallback!(config);

      expect(config.username).toBe(TEST_USERS.ENTRA_USER);
      expect(config.password).toBe(token);
    });

    it("should override existing username and password on the config", async () => {
      const mock = createMockSequelizeInstance();
      const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
      const credential = new TestTokenCredential(token);

      configureEntraAuthentication(mock, credential);

      const config = { username: "old-user", password: "old-password" };
      await mock.capturedCallback!(config);

      expect(config.username).toBe(TEST_USERS.ENTRA_USER);
      expect(config.password).toBe(token);
      expect(config.username).not.toBe("old-user");
      expect(config.password).not.toBe("old-password");
    });
  });

  describe("beforeConnect callback - appid token (managed identity)", () => {
    it("should set username from appid claim when UPN is absent", async () => {
      const mock = createMockSequelizeInstance();
      const token = createJwtTokenWithAppId(TEST_USERS.MANAGED_IDENTITY_APP_ID);
      const credential = new TestTokenCredential(token);

      configureEntraAuthentication(mock, credential);

      const config: { username?: string; password?: string } = {};
      await mock.capturedCallback!(config);

      expect(config.username).toBe(TEST_USERS.MANAGED_IDENTITY_APP_ID);
      expect(config.password).toBe(token);
    });
  });

  describe("beforeConnect callback - fallback username", () => {
    it("should use fallbackUsername when token has no upn or appid", async () => {
      // Create a JWT with neither upn nor appid
      const header = { alg: "RS256", typ: "JWT" };
      const payload = { sub: "some-subject", iat: 1234567890, exp: 9999999999 };
      const headerEncoded = Buffer.from(JSON.stringify(header)).toString("base64url");
      const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
      const token = `${headerEncoded}.${payloadEncoded}.fake-signature`;

      const credential = new TestTokenCredential(token);
      const mock = createMockSequelizeInstance();

      configureEntraAuthentication(mock, credential, {
        fallbackUsername: TEST_USERS.FALLBACK_USER,
      });

      const config: { username?: string; password?: string } = {};
      await mock.capturedCallback!(config);

      expect(config.username).toBe(TEST_USERS.FALLBACK_USER);
      expect(config.password).toBe(token);
    });

    it("should fall back to PGUSER env var when no upn, appid, or fallbackUsername", async () => {
      vi.stubEnv("PGUSER", "env-user@example.com");

      // Create a JWT with neither upn nor appid
      const header = { alg: "RS256", typ: "JWT" };
      const payload = { sub: "some-subject", iat: 1234567890, exp: 9999999999 };
      const headerEncoded = Buffer.from(JSON.stringify(header)).toString("base64url");
      const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
      const token = `${headerEncoded}.${payloadEncoded}.fake-signature`;

      const credential = new TestTokenCredential(token);
      const mock = createMockSequelizeInstance();

      configureEntraAuthentication(mock, credential);

      const config: { username?: string; password?: string } = {};
      await mock.capturedCallback!(config);

      expect(config.username).toBe("env-user@example.com");
    });

    it("should throw when no username can be derived", async () => {
      vi.stubEnv("PGUSER", "");

      // Create a JWT with neither upn nor appid
      const header = { alg: "RS256", typ: "JWT" };
      const payload = { sub: "some-subject", iat: 1234567890, exp: 9999999999 };
      const headerEncoded = Buffer.from(JSON.stringify(header)).toString("base64url");
      const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
      const token = `${headerEncoded}.${payloadEncoded}.fake-signature`;

      const credential = new TestTokenCredential(token);
      const mock = createMockSequelizeInstance();

      configureEntraAuthentication(mock, credential);

      const config: { username?: string; password?: string } = {};
      await expect(mock.capturedCallback!(config)).rejects.toThrow(
        "Could not determine DB username",
      );
    });
  });

  describe("beforeConnect callback - error handling", () => {
    it("should propagate token acquisition errors", async () => {
      const mock = createMockSequelizeInstance();
      const credential = new FailingTokenCredential("Simulated auth failure");

      configureEntraAuthentication(mock, credential);

      const config: { username?: string; password?: string } = {};
      await expect(mock.capturedCallback!(config)).rejects.toThrow("Simulated auth failure");
    });

    it("should handle invalid JWT token format gracefully", async () => {
      vi.stubEnv("PGUSER", "");

      // Token with wrong number of parts — decodeJwtToken returns null
      const badToken = "only-one-part";
      const credential = new TestTokenCredential(badToken);
      const mock = createMockSequelizeInstance();

      configureEntraAuthentication(mock, credential);

      const config: { username?: string; password?: string } = {};
      // With no upn/appid/fallback, this should fail to determine a username
      await expect(mock.capturedCallback!(config)).rejects.toThrow(
        "Could not determine DB username",
      );
    });
  });

  describe("credential invocation", () => {
    it("should invoke the credential on each beforeConnect call", async () => {
      const mock = createMockSequelizeInstance();
      const token = createValidJwtToken(TEST_USERS.ENTRA_USER);
      const credential = new TestTokenCredential(token);

      configureEntraAuthentication(mock, credential);

      const config1: { username?: string; password?: string } = {};
      await mock.capturedCallback!(config1);
      expect(credential.getCallCount()).toBe(1);

      const config2: { username?: string; password?: string } = {};
      await mock.capturedCallback!(config2);
      expect(credential.getCallCount()).toBe(2);
    });
  });
});
