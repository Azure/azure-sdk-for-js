// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a WorkloadNetwork
 *
 * @summary get a WorkloadNetwork
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_Get.json
 */
async function workloadNetworksGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.get("group1", "cloud1");
  console.log(result);
}

async function main() {
  await workloadNetworksGet();
}

main().catch(console.error);
