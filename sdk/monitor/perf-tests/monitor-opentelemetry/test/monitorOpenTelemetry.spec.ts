// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest } from "@azure/test-utils-perf";
import { useAzureMonitor, AzureMonitorOpenTelemetryOptions } from "@azure/monitor-opentelemetry";

import * as dotenv from "dotenv";
dotenv.config();

export abstract class MonitorOpenTelemetryTest<TOptions> extends PerfTest<TOptions> {  
  constructor() {
    super();
    const options: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString:
          "InstrumentationKey=b59d565e-da91-4140-8671-6c79b6938b4d;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/",
      },
    };
    useAzureMonitor(options);
  }
}
