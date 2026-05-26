// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ensureAzureSdkTracingBridge } from "../../../src/utils/azureSdkTracingBridge.js";

const esmRequire = createRequire(import.meta.url);

/**
 * Simulate the change the instrumentation team will make: export
 * OpenTelemetryInstrumenter from the package's public API.
 * We patch the CJS module in-place so the bridge's esmRequire() picks it up.
 */
function patchInstrumentationPackageExport(): void {
  const pkg = esmRequire("@azure/opentelemetry-instrumentation-azure-sdk");
  if (typeof pkg.OpenTelemetryInstrumenter !== "function") {
    const pkgMain = esmRequire.resolve("@azure/opentelemetry-instrumentation-azure-sdk");
    const { OpenTelemetryInstrumenter } = esmRequire(join(dirname(pkgMain), "instrumenter.js"));
    pkg.OpenTelemetryInstrumenter = OpenTelemetryInstrumenter;
  }
}

describe("ensureAzureSdkTracingBridge", () => {
  beforeEach(() => {
    patchInstrumentationPackageExport();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call useInstrumenter with the OpenTelemetryInstrumenter", () => {
    const coreTracing = esmRequire("@azure/core-tracing");
    const spy = vi.spyOn(coreTracing, "useInstrumenter");

    ensureAzureSdkTracingBridge();

    expect(spy).toHaveBeenCalledOnce();
    const arg = spy.mock.calls[0][0];
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
