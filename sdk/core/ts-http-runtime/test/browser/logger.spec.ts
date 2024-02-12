// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, expect, vi, afterEach } from "vitest";
import * as Logger from "../../src/logger/logger.js";

const testLogger = Logger.createClientLogger("test");

describe("TypeSpecRuntimeLogger (browser)", function () {
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
    expect(debugStub).toHaveBeenCalledOnce();
    expect(debugStub).toHaveBeenCalledWith(
      expectedTestMessage("typeSpecRuntime:test:verbose", "verbose"),
    );
    debugStub.mockClear();

    const infoStub = vi.spyOn(console, "info");
    testLogger.info("info");
    expect(infoStub).toHaveBeenCalledOnce();
    expect(infoStub).toHaveBeenCalledWith(expectedTestMessage("typeSpecRuntime:test:info", "info"));
    infoStub.mockClear();

    const warningStub = vi.spyOn(console, "warn");
    testLogger.warning("warning");
    expect(warningStub).toHaveBeenCalledOnce();
    expect(warningStub).toHaveBeenCalledWith(
      expectedTestMessage("typeSpecRuntime:test:warning", "warning"),
    );
    warningStub.mockClear();

    const errorStub = vi.spyOn(console, "error");
    testLogger.error("error");
    expect(errorStub).toHaveBeenCalledOnce();
    expect(errorStub).toHaveBeenCalledWith(
      expectedTestMessage("typeSpecRuntime:test:error", "error"),
    );
    errorStub.mockClear();
  });
});
