// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AiGatewayTelemetryExporterResource
 *
 * @summary create a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterCreate.json
 */
async function createOrUpdateAnAIGatewayTelemetryExporter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayTelemetryExporterResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "otlp-exporter",
    {
      properties: {
        telemetryExporterType: "OpenTelemetry",
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

/**
 * This sample demonstrates how to create a AiGatewayTelemetryExporterResource
 *
 * @summary create a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterCreateApplicationInsights.json
 */
async function createAnApplicationInsightsTelemetryExporter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayTelemetryExporterResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "insights-exporter",
    {
      properties: {
        telemetryExporterType: "ApplicationInsights",
        payloadCapture: false,
        applicationInsights: {
          connectionString: "{connection-string}",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/example-rg/providers/Microsoft.Insights/components/example-insights",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AiGatewayTelemetryExporterResource
 *
 * @summary create a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterCreateWithHeaders.json
 */
async function createAnOpenTelemetryExporterWithHeaderAuthentication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayTelemetryExporterResources.createOrUpdate(
    "example-rg",
    "example-gateway",
    "default",
    "otlp-exporter",
    {
      properties: {
        telemetryExporterType: "OpenTelemetry",
        payloadCapture: false,
        openTelemetry: { tracesEndpoint: { url: "https://collector.example.com/v1/traces" } },
        authentication: { headers: [{ name: "Authorization", value: "******" }] },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnAIGatewayTelemetryExporter();
  await createAnApplicationInsightsTelemetryExporter();
  await createAnOpenTelemetryExporterWithHeaderAuthentication();
}

main().catch(console.error);
