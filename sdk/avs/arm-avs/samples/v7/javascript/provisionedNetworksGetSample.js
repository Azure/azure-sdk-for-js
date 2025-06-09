// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ProvisionedNetwork
 *
 * @summary get a ProvisionedNetwork
 * x-ms-original-file: 2024-09-01/ProvisionedNetworks_Get.json
 */
async function provisionedNetworksGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.provisionedNetworks.get("group1", "cloud1", "vsan");
  console.log(result);
}

async function main() {
  await provisionedNetworksGet();
}

main().catch(console.error);
