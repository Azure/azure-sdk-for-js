// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AiGatewayTelemetryExporterResource
 *
 * @summary update a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterUpdate.json
 */
async function updateAnAIGatewayTelemetryExporter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayTelemetryExporterResources.update(
    "example-rg",
    "example-gateway",
    "default",
    "otlp-exporter",
    "*",
    {
      properties: {
        payloadCapture: false,
        openTelemetry: {
          metricsEndpoint: { url: "https://collector.example.com/v1/metrics" },
          logsEndpoint: { url: "https://collector.example.com/v1/logs" },
          tracesEndpoint: { url: "https://collector.example.com/v1/traces" },
        },
        authentication: {
          managedIdentity: {
            resource: "https://monitor.azure.com/",
            clientId: "11111111-1111-1111-1111-111111111111",
          },
        },
        telemetry: {
          attributes: [
            { source: { kind: "claims", value: "oid" }, signals: ["logs", "traces", "metrics"] },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnAIGatewayTelemetryExporter();
}

main().catch(console.error);
