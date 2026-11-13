// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AiGatewayTelemetryExporterResource
 *
 * @summary get a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterGet.json
 */
async function getAnAIGatewayTelemetryExporter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.aiGatewayTelemetryExporterResources.get(
    "example-rg",
    "example-gateway",
    "default",
    "otlp-exporter",
  );
  console.log(result);
}

async function main() {
  await getAnAIGatewayTelemetryExporter();
}

main().catch(console.error);
