// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { metrics, trace } from "@opentelemetry/api";
import { logs } from "@opentelemetry/api-logs";
import { useAzureMonitor, AzureMonitorOpenTelemetryOptions } from "../../../src/index";

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
    assert.ok(true);
  });
});
