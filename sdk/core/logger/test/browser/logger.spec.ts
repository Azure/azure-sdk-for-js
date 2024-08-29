// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as Logger from "../../src/index.js";
import { describe, it, expect, afterEach, vi } from "vitest";

const testLogger = Logger.createClientLogger("test");

describe("AzureLogger (browser)", function () {
  function expectedTestMessage(namespace: string, message: string): string {
    return `${namespace} ${message}`;
  }

  afterEach(() => {
    Logger.setLogLevel(undefined);
    vi.restoreAllMocks();
  });

  it("logs to the correct console function", () => {
    Logger.setLogLevel("verbose");

    const debugStub = vi.spyOn(console, "debug");
    testLogger.verbose("verbose");
    expect(debugStub).toHaveBeenCalledTimes(1);
    expect(debugStub).toHaveBeenCalledWith(expectedTestMessage("azure:test:verbose", "verbose"));
    debugStub.mockRestore();

    const infoStub = vi.spyOn(console, "info");
    testLogger.info("info");
    expect(infoStub).toHaveBeenCalledWith(expectedTestMessage("azure:test:info", "info"));
    infoStub.mockRestore();

    const warningStub = vi.spyOn(console, "warn");
    testLogger.warning("warning");
    expect(warningStub).toHaveBeenCalledWith(expectedTestMessage("azure:test:warning", "warning"));
    warningStub.mockRestore();

    const errorStub = vi.spyOn(console, "error");
    testLogger.error("error");
    expect(errorStub).toHaveBeenCalledWith(expectedTestMessage("azure:test:error", "error"));
    errorStub.mockRestore();
  });
});
