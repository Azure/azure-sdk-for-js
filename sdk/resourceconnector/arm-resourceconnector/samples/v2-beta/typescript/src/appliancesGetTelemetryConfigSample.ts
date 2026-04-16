// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the telemetry config.
 *
 * @summary gets the telemetry config.
 * x-ms-original-file: 2025-03-01-preview/TelemetryConfig.json
 */
async function getTelemetryConfigAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.getTelemetryConfig();
  console.log(result);
}

async function main(): Promise<void> {
  await getTelemetryConfigAppliance();
}

main().catch(console.error);
