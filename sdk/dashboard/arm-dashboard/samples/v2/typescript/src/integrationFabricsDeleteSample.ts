// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a IntegrationFabric
 *
 * @summary delete a IntegrationFabric
 * x-ms-original-file: 2025-08-01/IntegrationFabrics_Delete.json
 */
async function integrationFabricsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  await client.integrationFabrics.delete("myResourceGroup", "myWorkspace", "sampleIntegration");
}

async function main(): Promise<void> {
  await integrationFabricsDelete();
}

main().catch(console.error);
