// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production
 *
 * @summary gets the SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production
 * x-ms-original-file: 2025-05-01/CloudServiceSwapGet.json
 */
async function getSwapResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vipSwap.get("rg1", "testCloudService");
  console.log(result);
}

async function main() {
  await getSwapResource();
}

main().catch(console.error);
