// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get current subscription usage of the specific type
 *
 * @summary get current subscription usage of the specific type
 * x-ms-original-file: 2025-09-01-preview/Usages_Get.json
 */
async function usagesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResourceUsages.get("eastus", "totalTibsPerSubscription");
  console.log(result);
}

async function main(): Promise<void> {
  await usagesGet();
}

main().catch(console.error);
