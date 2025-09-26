// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest } from "@azure-tools/test-perf";
import type { AzureMonitorOpenTelemetryOptions } from "@azure/monitor-opentelemetry";
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import "dotenv/config";

export abstract class MonitorOpenTelemetryTest<TOptions> extends PerfTest<TOptions> {
  constructor() {
    super();
    const options: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString:
          process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
      },
    };
    useAzureMonitor(options);
  }
}
