// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a dedicated host group.
 *
 * @summary delete a dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Delete_MaximumSet_Gen.json
 */
async function dedicatedHostGroupDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHostGroups.delete("rgcompute", "a");
}

/**
 * This sample demonstrates how to delete a dedicated host group.
 *
 * @summary delete a dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Delete_MinimumSet_Gen.json
 */
async function dedicatedHostGroupDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHostGroups.delete("rgcompute", "aaaa");
}

async function main() {
  await dedicatedHostGroupDeleteMaximumSetGen();
  await dedicatedHostGroupDeleteMinimumSetGen();
}

main().catch(console.error);
