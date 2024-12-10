// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as utils from "../../src/utils/utils.js";
import {
  EntraIdAccessTokenConstants,
  ServiceEnvironmentVariable,
} from "../../src/common/constants.js";
import playwrightServiceEntra from "../../src/core/playwrightServiceEntra.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

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
    vi.spyOn(
      playwrightServiceEntra["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockResolvedValue();

    const setupHandler = vi.spyOn(
      playwrightServiceEntra as any,
      "entraIdGlobalSetupRotationHandler",
    );

    await playwrightServiceEntra.globalSetup();

    expect(
      playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();

    expect(setupHandler).toHaveBeenCalledOnce();
  });

  it("should throw error if entra id access token fetch fails", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    vi.spyOn(utils, "parseJwt").mockReturnValue({ exp: new Date().getTime() / 1000 + 10000 });
    vi.spyOn(
      playwrightServiceEntra["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockImplementation(() => {
      throw new Error();
    });

    const setupHandler = vi.spyOn(
      playwrightServiceEntra as any,
      "entraIdGlobalSetupRotationHandler",
    );

    await expect(playwrightServiceEntra.globalSetup()).rejects.toThrowError();

    expect(
      playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();
    expect(setupHandler).not.toHaveBeenCalled();
  });

  it("should be no-op if entra id access token rotation interval doesn't exist", () => {
    const clearIntervalStub = vi.spyOn(global, "clearInterval");

    playwrightServiceEntra.globalTeardown();

    expect(clearIntervalStub).not.toHaveBeenCalled();
  });

  it("should clear entra id access token rotation interval", () => {
    const intervalId = 1;
    const clearIntervalStub = vi.spyOn(global, "clearInterval");

    playwrightServiceEntra["_entraIdAccessTokenRotationInterval"] = intervalId as any;
    playwrightServiceEntra.globalTeardown();

    expect(clearIntervalStub).toHaveBeenCalledWith(intervalId);
  });

  it("should setup entra id access token rotation handler", () => {
    const newInterval = setInterval(() => {}, 100000);
    const setIntervalStub = vi.spyOn(global, "setInterval").mockImplementation(() => newInterval);

    playwrightServiceEntra.entraIdGlobalSetupRotationHandler();

    expect(setIntervalStub).toHaveBeenCalled();
    expect(setIntervalStub).toHaveBeenCalledWith(
      playwrightServiceEntra.entraIdAccessTokenRotation,
      EntraIdAccessTokenConstants.ROTATION_INTERVAL_PERIOD_IN_MINUTES * 60 * 1000,
    );

    expect(playwrightServiceEntra["_entraIdAccessTokenRotationInterval"]).to.equal(newInterval);
    clearInterval(newInterval);
  });

  it("should rotate entra id access token if needed", async () => {
    vi.spyOn(
      playwrightServiceEntra["_entraIdAccessToken"],
      "doesEntraIdAccessTokenNeedRotation",
    ).mockReturnValue(true);
    vi.spyOn(
      playwrightServiceEntra["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockResolvedValue();

    await playwrightServiceEntra.entraIdAccessTokenRotation();

    expect(
      playwrightServiceEntra["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation,
    ).toHaveBeenCalledOnce();
    expect(
      playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();
  });

  it("should not throw error during entra id access token rotation if fetch fails", async () => {
    vi.spyOn(
      playwrightServiceEntra["_entraIdAccessToken"],
      "doesEntraIdAccessTokenNeedRotation",
    ).mockReturnValue(true);

    vi.spyOn(
      playwrightServiceEntra["_entraIdAccessToken"],
      "fetchEntraIdAccessToken",
    ).mockImplementation(() => {
      throw new Error();
    });

    await playwrightServiceEntra.entraIdAccessTokenRotation();

    expect(
      playwrightServiceEntra["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation,
    ).toHaveBeenCalledOnce();
    expect(
      playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).toHaveBeenCalledOnce();
  });

  it("should not rotate entra id access token if not needed", async () => {
    vi.spyOn(
      playwrightServiceEntra["_entraIdAccessToken"],
      "doesEntraIdAccessTokenNeedRotation",
    ).mockReturnValue(false);
    vi.spyOn(playwrightServiceEntra["_entraIdAccessToken"], "fetchEntraIdAccessToken");

    await playwrightServiceEntra.entraIdAccessTokenRotation();

    expect(
      playwrightServiceEntra["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation,
    ).toHaveBeenCalledOnce();
    expect(
      playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken,
    ).not.toHaveBeenCalled();
  });
});
