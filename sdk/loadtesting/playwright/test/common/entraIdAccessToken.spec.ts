// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EntraIdAccessTokenConstants,
  InternalEnvironmentVariables,
  ServiceEnvironmentVariable,
} from "../../src/common/constants.js";
import { EntraIdAccessToken } from "../../src/common/entraIdAccessToken.js";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { parseJwt } from "../../src/utils/parseJwt.js";

vi.mock("../../src/utils/parseJwt.js", () => ({
  parseJwt: vi.fn(),
}));

describe("EntraIdAccessToken", () => {
  beforeEach(() => {
    vi.spyOn(console, "error");
    vi.spyOn(console, "log");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set entra id access token from environment variable on object creation", () => {
    const token = "token";
    const expiry = Date.now();
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;

    vi.mocked(parseJwt).mockReturnValue({
      exp: expiry / 1000,
    });
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).to.equal(token);
    expect(entraIdAccessToken["_expiryTimestamp"]).to.equal(expiry);
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not set entra id access token if environment variable is empty on object creation", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).toBeUndefined();
    expect(entraIdAccessToken["_expiryTimestamp"]).toBeUndefined();
  });

  it("should not set entra id access token if mpt pat is set in environment variable on object creation", () => {
    const token = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;

    vi.mocked(parseJwt).mockReturnValue({
      aid: "aid",
    });
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).toBeUndefined();
    expect(entraIdAccessToken["_expiryTimestamp"]).toBeUndefined();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not set entra id access token if mpt back compat pat is set in environment variable on object creation", () => {
    const token = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;

    vi.mocked(parseJwt).mockReturnValue({
      accountId: "accountId",
    });
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).toBeUndefined();
    expect(entraIdAccessToken["_expiryTimestamp"]).toBeUndefined();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not set entra id access token if jwt decode throws error on object creation", () => {
    const token = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;
    vi.mocked(parseJwt).mockImplementation(() => {
      throw new Error();
    });
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).toBeUndefined();
    expect(entraIdAccessToken["_expiryTimestamp"]).toBeUndefined();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch and set entra id access token in environment variable", async () => {
    const token = "token";
    const expiry = Date.now();
    const accessToken = {
      token,
      expiresOnTimestamp: expiry,
    };
    const credential = {
      getToken: vi.fn().mockResolvedValue(accessToken),
    };
    const entraIdAccessToken = new EntraIdAccessToken(credential);
    await entraIdAccessToken.fetchEntraIdAccessToken();
    expect(entraIdAccessToken.token).to.equal(token);
    expect(entraIdAccessToken["_expiryTimestamp"]).to.equal(expiry);
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN]).to.equal(token);
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should be no-op if cached access token is returned", async () => {
    const token = "token";
    const accessToken = {
      token,
    };
    const credential = {
      getToken: vi.fn().mockResolvedValue(accessToken),
    };
    const entraIdAccessToken = new EntraIdAccessToken(credential);
    entraIdAccessToken.token = token;
    await entraIdAccessToken.fetchEntraIdAccessToken();
  });

  it("should throw error and set fatal setup environment variable if fetching access token throws error", async () => {
    const credential = {
      getToken: vi.fn().mockRejectedValue(new Error()),
    };
    const entraIdAccessToken = new EntraIdAccessToken(credential);
    await expect(() => entraIdAccessToken.fetchEntraIdAccessToken()).rejects.toThrowError();
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN]).toBeUndefined();
    expect(process.env[InternalEnvironmentVariables.MPT_SETUP_FATAL_ERROR]).to.equal("true");
  });

  it("should return true if entra id access token needs rotation due to no token", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    const status = entraIdAccessToken.doesEntraIdAccessTokenNeedRotation();
    expect(status).toBeTruthy();
  });

  it("should return true if entra id access token needs rotation due to expiry", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    entraIdAccessToken.token = "token";
    entraIdAccessToken["_expiryTimestamp"] =
      Date.now() +
      EntraIdAccessTokenConstants.LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION * 60 * 1000 -
      1;
    const status = entraIdAccessToken.doesEntraIdAccessTokenNeedRotation();
    expect(status).toBeTruthy();
  });

  it("should return false if entra id access token does not need rotation", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    entraIdAccessToken.token = "token";
    entraIdAccessToken["_expiryTimestamp"] =
      Date.now() +
      EntraIdAccessTokenConstants.LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION * 60 * 1000 +
      5000;
    const status = entraIdAccessToken.doesEntraIdAccessTokenNeedRotation();
    expect(status).toBeFalsy();
  });
});
