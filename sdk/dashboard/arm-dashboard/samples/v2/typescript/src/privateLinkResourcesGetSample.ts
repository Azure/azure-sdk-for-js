// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get specific private link resource information for this grafana resource
 *
 * @summary get specific private link resource information for this grafana resource
 * x-ms-original-file: 2025-08-01/PrivateLinkResources_Get.json
 */
async function privateLinkResourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("myResourceGroup", "myWorkspace", "grafana");
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesGet();
}

main().catch(console.error);
