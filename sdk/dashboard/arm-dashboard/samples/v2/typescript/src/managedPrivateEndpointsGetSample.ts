// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific managed private endpoint of a grafana resource.
 *
 * @summary get a specific managed private endpoint of a grafana resource.
 * x-ms-original-file: 2025-08-01/ManagedPrivateEndpoints_Get.json
 */
async function managedPrivateEndpointGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.get(
    "myResourceGroup",
    "myWorkspace",
    "myMPEName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedPrivateEndpointGet();
}

main().catch(console.error);
