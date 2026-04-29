// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an dedicated host group.
 *
 * @summary update an dedicated host group.
 * x-ms-original-file: 2025-11-01/dedicatedHostExamples/DedicatedHostGroup_Update_MaximumSet_Gen.json
 */
async function dedicatedHostGroupUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.update("rgcompute", "aaaa", {
    platformFaultDomainCount: 3,
    supportAutomaticPlacement: true,
    zones: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
    tags: { key9921: "aaaaaaaaaa" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update an dedicated host group.
 *
 * @summary update an dedicated host group.
 * x-ms-original-file: 2025-11-01/dedicatedHostExamples/DedicatedHostGroup_Update_MinimumSet_Gen.json
 */
async function dedicatedHostGroupUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.update("rgcompute", "aaaaaaaaaaa", {});
  console.log(result);
}

async function main(): Promise<void> {
  await dedicatedHostGroupUpdateMaximumSetGen();
  await dedicatedHostGroupUpdateMinimumSetGen();
}

main().catch(console.error);
