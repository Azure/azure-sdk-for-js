// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import {
  useAzureMonitor,
  AzureMonitorOpenTelemetryOptions,
  shutdownAzureMonitor,
} from "../../../src/index";
import { MeterProvider } from "@opentelemetry/sdk-metrics";

describe("Main functions", () => {
  after(() => {
    trace.disable();
    metrics.disable();
    logs.disable();
  });

  it("useAzureMonitor", () => {
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
    };
    useAzureMonitor(config);
    assert.ok(metrics.getMeterProvider());
    assert.ok(trace.getTracerProvider());
    assert.ok(logs.getLoggerProvider());
  });

  it("should shutdown azureMonitor", () => {
    shutdownAzureMonitor();
    const meterProvider = metrics.getMeterProvider() as MeterProvider;
    assert.strictEqual(meterProvider["_shutdown"], true);
  });

  it("should set statsbeat features", () => {
    let config: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      },
      instrumentationOptions: {
        azureSdk: {
          enabled: true,
        },
        mongoDb: {
          enabled: true,
        },
        mySql: {
          enabled: true,
        },
        postgreSql: {
          enabled: true,
        },
        redis: {
          enabled: true,
        },
      },
    };
    useAzureMonitor(config);
    assert.strictEqual(
      process.env["AZURE_MONITOR_STATSBEAT_FEATURES"],
      JSON.stringify({ instrumentation: 15, feature: 4 })
    );
  });
});
