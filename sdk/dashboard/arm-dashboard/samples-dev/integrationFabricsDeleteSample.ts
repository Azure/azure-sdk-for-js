// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a IntegrationFabric
 *
 * @summary delete a IntegrationFabric
 * x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Delete.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

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
