// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as utils from "../../src/utils/utils.js";
import {
  EntraIdAccessTokenConstants,
  ServiceEnvironmentVariable,
} from "../../src/common/constants.js";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig.js";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("playwrightServiceEntra", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockReturnValue(); // Mock console.error
    vi.spyOn(console, "log").mockReturnValue(); // Mock console.log
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch entra id access token and setup rotation handler", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    vi.spyOn(
      (playwrightServiceEntra as any)["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockResolvedValue(true);
    vi.spyOn(playwrightServiceEntra as any, "entraIdGlobalSetupRotationHandler");
    vi.spyOn(playwrightServiceEntra as any, "prefetchStorageAccessToken").mockResolvedValue(
      undefined,
    );

    await playwrightServiceEntra.globalSetup();

    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();
    expect((playwrightServiceEntra as any).prefetchStorageAccessToken).toHaveBeenCalledOnce();
    expect(
      (playwrightServiceEntra as any).entraIdGlobalSetupRotationHandler,
    ).toHaveBeenCalledOnce();
  });

  it("should throw error if entra id access token fetch fails", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";

    vi.spyOn(utils, "parseJwt").mockReturnValue({ exp: new Date().getTime() / 1000 + 10000 });
    vi.spyOn(
      (playwrightServiceEntra as any)["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockImplementation(() => {
      throw new Error("Failed to fetch access token");
    });
    vi.spyOn(playwrightServiceEntra as any, "entraIdGlobalSetupRotationHandler");

    await expect(() => playwrightServiceEntra.globalSetup()).rejects.toThrowError();

    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();
    expect(
      (playwrightServiceEntra as any).entraIdGlobalSetupRotationHandler,
    ).not.toHaveBeenCalled();
  });

  it("should be no-op if entra id access token rotation interval doesn't exist", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    const clearIntervalStub = vi.spyOn(global, "clearInterval");

    playwrightServiceEntra.globalTeardown();

    expect(clearIntervalStub).not.toHaveBeenCalled();
  });

  it("should clear entra id access token rotation interval", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    const intervalId = 1;
    const clearIntervalStub = vi.spyOn(global, "clearInterval");

    (playwrightServiceEntra as any)["_entraIdAccessTokenRotationInterval"] = intervalId;
    playwrightServiceEntra.globalTeardown();

    expect(clearIntervalStub).toHaveBeenCalledWith(intervalId);
  });

  it("should setup entra id access token rotation handler", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    const newInterval = setInterval(() => {}, 100000);
    const setIntervalStub = vi.spyOn(global, "setInterval").mockImplementation(() => newInterval);

    (playwrightServiceEntra as any).entraIdGlobalSetupRotationHandler();

    expect(setIntervalStub).toHaveBeenCalled();
    expect(setIntervalStub).toHaveBeenCalledWith(
      (playwrightServiceEntra as any).entraIdAccessTokenRotation,
      EntraIdAccessTokenConstants.ROTATION_INTERVAL_PERIOD_IN_MINUTES * 60 * 1000,
    );
    expect((playwrightServiceEntra as any)["_entraIdAccessTokenRotationInterval"]).to.equal(
      newInterval,
    );
    clearInterval(newInterval);
  });

  it("should rotate entra id access token if needed", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    vi.spyOn(
      (playwrightServiceEntra as any)["_entraIdAccessToken"],
      "doesEntraIdAccessTokenNeedRotation",
    ).mockReturnValue(true);

    vi.spyOn(
      (playwrightServiceEntra as any)["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockResolvedValue(true);

    await (playwrightServiceEntra as any).entraIdAccessTokenRotation();

    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation,
    ).toHaveBeenCalledOnce();
    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();
  });

  it("should not throw error during entra id access token rotation if fetch fails", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    vi.spyOn(
      (playwrightServiceEntra as any)["_entraIdAccessToken"],
      "doesEntraIdAccessTokenNeedRotation",
    ).mockReturnValue(true);
    vi.spyOn(
      (playwrightServiceEntra as any)["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockImplementation(() => {
      throw new Error();
    });

    await (playwrightServiceEntra as any).entraIdAccessTokenRotation();

    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation,
    ).toHaveBeenCalledOnce();
    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();
  });

  it("should not rotate entra id access token if not needed", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    vi.spyOn(
      (playwrightServiceEntra as any)["_entraIdAccessToken"],
      "doesEntraIdAccessTokenNeedRotation",
    ).mockReturnValue(false);
    vi.spyOn((playwrightServiceEntra as any)["_entraIdAccessToken"], "fetchEntraIdAccessToken");

    await (playwrightServiceEntra as any).entraIdAccessTokenRotation();

    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation,
    ).toHaveBeenCalledOnce();
    expect(
      (playwrightServiceEntra as any)["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).not.toHaveBeenCalled();
  });

  it("should pre-fetch storage access token when credential is available", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    const mockToken = { token: "storage-token", expiresOnTimestamp: Date.now() + 3600000 };
    const mockCredential = {
      getToken: vi.fn().mockResolvedValue(mockToken),
    };
    PlaywrightServiceConfig.instance.credential = mockCredential as any;
    PlaywrightServiceConfig.instance.storageAccessToken = undefined;

    await (playwrightServiceEntra as any).prefetchStorageAccessToken();

    expect(mockCredential.getToken).toHaveBeenCalledWith(EntraIdAccessTokenConstants.STORAGE_SCOPE);
    expect(PlaywrightServiceConfig.instance.storageAccessToken).toEqual(mockToken);

    PlaywrightServiceConfig.instance.credential = undefined;
    PlaywrightServiceConfig.instance.storageAccessToken = undefined;
  });

  it("should skip storage token pre-fetch when no credential is available", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    PlaywrightServiceConfig.instance.credential = undefined;
    PlaywrightServiceConfig.instance.storageAccessToken = undefined;

    await (playwrightServiceEntra as any).prefetchStorageAccessToken();

    expect(PlaywrightServiceConfig.instance.storageAccessToken).toBeUndefined();
  });

  it("should not throw when storage token pre-fetch fails", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    const mockCredential = {
      getToken: vi.fn().mockRejectedValue(new Error("token fetch failed")),
    };
    PlaywrightServiceConfig.instance.credential = mockCredential as any;
    PlaywrightServiceConfig.instance.storageAccessToken = undefined;

    await (playwrightServiceEntra as any).prefetchStorageAccessToken();

    expect(mockCredential.getToken).toHaveBeenCalledWith(EntraIdAccessTokenConstants.STORAGE_SCOPE);
    expect(PlaywrightServiceConfig.instance.storageAccessToken).toBeUndefined();

    PlaywrightServiceConfig.instance.credential = undefined;
  });

  it("should not set storageAccessToken when getToken returns null", async () => {
    const playwrightServiceEntraModule = await import("../../src/core/playwrightServiceEntra.js");
    const playwrightServiceEntra = playwrightServiceEntraModule.default;
    (playwrightServiceEntra as any)._entraIdAccessTokenRotationInterval = undefined;

    const mockCredential = {
      getToken: vi.fn().mockResolvedValue(null),
    };
    PlaywrightServiceConfig.instance.credential = mockCredential as any;
    PlaywrightServiceConfig.instance.storageAccessToken = undefined;

    await (playwrightServiceEntra as any).prefetchStorageAccessToken();

    expect(mockCredential.getToken).toHaveBeenCalledWith(EntraIdAccessTokenConstants.STORAGE_SCOPE);
    expect(PlaywrightServiceConfig.instance.storageAccessToken).toBeUndefined();

    PlaywrightServiceConfig.instance.credential = undefined;
  });
});
