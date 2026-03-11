// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFunctionsInstrumentation } from "@azure/functions-opentelemetry-instrumentation";
import { TraceHandler } from "../../../../src/traces/index.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import { MetricHandler } from "../../../../src/metrics/index.js";
import { metrics, trace } from "@opentelemetry/api";
import { describe, it, beforeEach, afterEach, assert } from "vitest";
import { shutdownAzureMonitor, useAzureMonitor } from "../../../../src/index.js";

describe("Library/AzureFunctionsInstrumentation", () => {
  let metricHandler: MetricHandler;
  let handler: TraceHandler;

  afterEach(async () => {
    if (metricHandler) {
      metricHandler.shutdown();
    }
    if (handler) {
      handler.shutdown();
    }
    metrics.disable();
    trace.disable();
    await shutdownAzureMonitor();
  });

  beforeEach(() => {
    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
      },
    });
  });

  it("AzureFunctionsInstrumentation is always included", () => {
    const config = new InternalConfig({});
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    metricHandler = new MetricHandler(config);
    handler = new TraceHandler(config, metricHandler);
    const instrumentations = handler.getInstrumentations();
    const azureFnInstrumentation = instrumentations.find(
      (i) => i instanceof AzureFunctionsInstrumentation,
    );
    assert.isDefined(azureFnInstrumentation, "AzureFunctionsInstrumentation should be registered");
  });
});
