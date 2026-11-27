// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AiGatewayTelemetryExporterResource
 *
 * @summary delete a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterDelete.json
 */
async function deleteAnAIGatewayTelemetryExporter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.aiGatewayTelemetryExporterResources.delete(
    "example-rg",
    "example-gateway",
    "default",
    "otlp-exporter",
    "*",
  );
}

async function main(): Promise<void> {
  await deleteAnAIGatewayTelemetryExporter();
}

main().catch(console.error);
