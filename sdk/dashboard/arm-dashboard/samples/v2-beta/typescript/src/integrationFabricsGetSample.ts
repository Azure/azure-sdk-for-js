// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a IntegrationFabric
 *
 * @summary get a IntegrationFabric
 * x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Get.json
 */
async function integrationFabricsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardClient(credential, subscriptionId);
  const result = await client.integrationFabrics.get(
    "myResourceGroup",
    "myWorkspace",
    "sampleIntegration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationFabricsGet();
}

main().catch(console.error);
