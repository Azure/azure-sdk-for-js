// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

import * as dotenv from "dotenv";
dotenv.config();

export abstract class MonitorOpenTelemetryExporterTest<TOptions> extends PerfTest<TOptions> {
  client: AzureMonitorTraceExporter;
  
  constructor() {
    super();
    this.client = new AzureMonitorTraceExporter({
      connectionString: getEnvVar("APPLICATIONINSIGHTS_CONNECTION_STRING")
    });
  }
}
