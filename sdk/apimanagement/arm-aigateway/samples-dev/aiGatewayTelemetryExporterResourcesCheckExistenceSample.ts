// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-aigateway";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check for the existence of a AiGatewayTelemetryExporterResource
 *
 * @summary check for the existence of a AiGatewayTelemetryExporterResource
 * x-ms-original-file: 2026-11-01/AiGatewayTelemetryExporterCheckExistence.json
 */
async function checkWhetherAnAIGatewayTelemetryExporterExists(): Promise<void> {
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

async function main(): Promise<void> {
  await checkWhetherAnAIGatewayTelemetryExporterExists();
}

main().catch(console.error);
