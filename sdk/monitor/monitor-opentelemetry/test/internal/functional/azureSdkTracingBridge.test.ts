// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Functional test: verifies that the eager Azure SDK tracing bridge is called
 * during useAzureMonitor() initialization, ensuring Azure SDK spans are not
 * dropped even when core-tracing is loaded first.
 */

import { createRequire } from "node:module";
import { trace, metrics } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useAzureMonitor, shutdownAzureMonitor } from "../../../src/index.js";

const esmRequire = createRequire(import.meta.url);

describe("Azure SDK tracing bridge (import order)", () => {
  afterEach(async () => {
    await shutdownAzureMonitor();
    trace.disable();
    metrics.disable();
    logs.disable();
    vi.restoreAllMocks();
  });

  it.each([undefined, true])(
    "should eagerly install the tracing bridge when azureSdk.enabled is %s",
    (enabled) => {
      // Use CJS require to get the same module instance the bridge uses internally
      const coreTracing = esmRequire("@azure/core-tracing");
      const spy = vi.spyOn(coreTracing, "useInstrumenter");

      useAzureMonitor({
        azureMonitorExporterOptions: {
          connectionString:
            "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://dc.services.visualstudio.com",
        },
        instrumentationOptions: enabled === undefined ? undefined : { azureSdk: { enabled } },
      });

      // The bridge should have eagerly called useInstrumenter with an
      // OpenTelemetryInstrumenter instance.
      expect(spy).toHaveBeenCalled();
      const arg = spy.mock.calls[spy.mock.calls.length - 1][0] as { startSpan?: unknown };
      expect(arg).toBeDefined();
      expect(typeof arg.startSpan).toBe("function");
    },
  );

  it("should not replace the instrumenter when Azure SDK instrumentation is disabled", () => {
    const coreTracing = esmRequire("@azure/core-tracing");
    const spy = vi.spyOn(coreTracing, "useInstrumenter");

    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      instrumentationOptions: {
        azureSdk: { enabled: false },
      },
    });

    expect(spy).not.toHaveBeenCalled();
  });
});
