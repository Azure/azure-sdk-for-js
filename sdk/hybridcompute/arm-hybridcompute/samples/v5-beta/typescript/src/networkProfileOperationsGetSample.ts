// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get network information of hybrid machine
 *
 * @summary the operation to get network information of hybrid machine
 * x-ms-original-file: 2025-09-16-preview/NetworkProfile_Get.json
 */
async function getNetworkProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.networkProfileOperations.get("myResourceGroup", "myMachine");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkProfile();
}

main().catch(console.error);
