// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequire } from "node:module";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ensureAzureSdkTracingBridge } from "../../../src/utils/azureSdkTracingBridge.js";

const esmRequire = createRequire(import.meta.url);

describe("ensureAzureSdkTracingBridge", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call useInstrumenter with the OpenTelemetryInstrumenter", () => {
    const coreTracing = esmRequire("@azure/core-tracing");
    const spy = vi.spyOn(coreTracing, "useInstrumenter");

    ensureAzureSdkTracingBridge();

    expect(spy).toHaveBeenCalledOnce();
    const arg = spy.mock.calls[0][0] as { startSpan?: unknown; withContext?: unknown };
    expect(arg).toBeDefined();
    expect(typeof arg.startSpan).toBe("function");
    expect(typeof arg.withContext).toBe("function");
  });

  it("should not throw if called multiple times", () => {
    expect(() => {
      ensureAzureSdkTracingBridge();
      ensureAzureSdkTracingBridge();
    }).not.toThrow();
  });
});
