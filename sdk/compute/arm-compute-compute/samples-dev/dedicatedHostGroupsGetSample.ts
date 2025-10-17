// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a dedicated host group.
 *
 * @summary retrieves information about a dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Get.json
 */
async function createADedicatedHostGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.get("myResourceGroup", "myDedicatedHostGroup");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a dedicated host group.
 *
 * @summary retrieves information about a dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Get_UltraSSDEnabledDedicatedHostGroup.json
 */
async function createAnUltraSSDEnabledDedicatedHostGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.get("myResourceGroup", "myDedicatedHostGroup");
  console.log(result);
}

async function main(): Promise<void> {
  await createADedicatedHostGroup();
  await createAnUltraSSDEnabledDedicatedHostGroup();
}

main().catch(console.error);
