// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available dedicated host sizes to which the specified dedicated host can be resized. NOTE: The dedicated host sizes provided can be used to only scale up the existing dedicated host.
 *
 * @summary lists all available dedicated host sizes to which the specified dedicated host can be resized. NOTE: The dedicated host sizes provided can be used to only scale up the existing dedicated host.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_ListAvailableSizes.json
 */
async function getAvailableDedicatedHostSizes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHosts.listAvailableSizes(
    "myResourceGroup",
    "myDedicatedHostGroup",
    "myHost",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAvailableDedicatedHostSizes();
}

main().catch(console.error);
