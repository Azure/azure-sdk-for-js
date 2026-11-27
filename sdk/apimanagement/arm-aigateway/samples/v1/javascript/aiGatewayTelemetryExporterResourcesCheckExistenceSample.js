// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-aigateway");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check for the existence of a AiGatewayTelemetryExporterResource
 *
 * @summary check for the existence of a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterCheckExistence.json
 */
async function checkWhetherAnAIGatewayTelemetryExporterExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayTelemetryExporterResources.checkExistence(
    "example-rg",
    "example-gateway",
    "default",
    "otlp-exporter",
  );
}

async function main() {
  await checkWhetherAnAIGatewayTelemetryExporterExists();
}

main().catch(console.error);
