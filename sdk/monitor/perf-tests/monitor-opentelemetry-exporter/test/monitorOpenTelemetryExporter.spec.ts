// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest } from "@azure/test-utils-perf";
import * as opentelemetry from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { BasicTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

import * as dotenv from "dotenv";
dotenv.config();

export abstract class MonitorOpenTelemetryExporterTest<TOptions> extends PerfTest<TOptions> {
  client: AzureMonitorTraceExporter;
  tracer: opentelemetry.Tracer;
  
  constructor() {
    super();
    this.client = new AzureMonitorTraceExporter({
      connectionString: // getEnvVar("APPLICATIONINSIGHTS_CONNECTION_STRING")
      "InstrumentationKey=b59d565e-da91-4140-8671-6c79b6938b4d;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/"
    });
    const provider = new BasicTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
      }),
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(this.client as any));
    provider.register();
    this.tracer = opentelemetry.trace.getTracer("example-basic-tracer-node");
  }
}
