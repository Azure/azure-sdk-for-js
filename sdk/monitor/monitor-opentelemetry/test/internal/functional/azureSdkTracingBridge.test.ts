// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Functional test: verifies that the eager Azure SDK tracing bridge is called
 * during useAzureMonitor() initialization, ensuring Azure SDK spans are not
 * dropped even when @azure/core-tracing is loaded first.
 */

import { createRequire } from "node:module";
import { trace, metrics } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useAzureMonitor } from "../../../src/index.js";

const esmRequire = createRequire(import.meta.url);

describe("Azure SDK tracing bridge (import order)", () => {

  afterEach(() => {
    trace.disable();
    metrics.disable();
    logs.disable();
    vi.restoreAllMocks();
  });

  it("should eagerly install the tracing bridge during useAzureMonitor", () => {
    // Use CJS require to get the same module instance the bridge uses internally
    const coreTracing = esmRequire("@azure/core-tracing");
    const spy = vi.spyOn(coreTracing, "useInstrumenter");

    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString:
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://dc.services.visualstudio.com",
      },
    });

    // The bridge should have eagerly called useInstrumenter with an
    // OpenTelemetryInstrumenter instance. This test will fail until
    // @azure/opentelemetry-instrumentation-azure-sdk exports the class.
    expect(spy).toHaveBeenCalled();
    const arg = spy.mock.calls[spy.mock.calls.length - 1][0];
    expect(arg).toBeDefined();
    expect(typeof arg.startSpan).toBe("function");
  });
});
