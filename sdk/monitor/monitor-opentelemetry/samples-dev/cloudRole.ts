// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to set Cloud Role Name and Cloud Role Instance using OpenTelemetry Resource attributes.
 */

import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import "dotenv/config";

async function main(): Promise<void> {
  const customResource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || "my-service",
    "service.namespace": process.env.OTEL_SERVICE_NAMESPACE || "my-namespace",
    "service.instance.id": process.env.OTEL_SERVICE_INSTANCE_ID || "my-instance",
  });

  const options = {
    resource: customResource,
    azureMonitorExporterOptions: {
      connectionString:
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "<your connection string>",
    },
  };

  useAzureMonitor(options);

  console.log("Azure Monitor configured with custom cloud role settings:");
  console.log(
    `  Cloud Role Name: ${process.env.OTEL_SERVICE_NAMESPACE || "my-namespace"}.${process.env.OTEL_SERVICE_NAME || "my-service"}`,
  );
  console.log(`  Cloud Role Instance: ${process.env.OTEL_SERVICE_INSTANCE_ID || "my-instance"}`);
}

main().catch(console.error);
