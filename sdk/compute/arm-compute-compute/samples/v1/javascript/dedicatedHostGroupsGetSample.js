// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a dedicated host group.
 *
 * @summary retrieves information about a dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Get.json
 */
async function createADedicatedHostGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.get("myResourceGroup", "myDedicatedHostGroup");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves information about a dedicated host group.
 *
 * @summary retrieves information about a dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Get_UltraSSDEnabledDedicatedHostGroup.json
 */
async function createAnUltraSSDEnabledDedicatedHostGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.get("myResourceGroup", "myDedicatedHostGroup");
  console.log(result);
}

async function main() {
  await createADedicatedHostGroup();
  await createAnUltraSSDEnabledDedicatedHostGroup();
}

main().catch(console.error);
