// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get specific private link resource information for this grafana resource
 *
 * @summary get specific private link resource information for this grafana resource
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkResources_Get.json
 */
async function privateLinkResourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("myResourceGroup", "myWorkspace", "grafana");
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesGet();
}

main().catch(console.error);
