// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production
 *
 * @summary gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production
 * x-ms-original-file: 2025-05-01/CloudServiceSwapList.json
 */
async function getSwapResourceList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vipSwap.list("rg1", "testCloudService");
  console.log(result);
}

async function main() {
  await getSwapResourceList();
}

main().catch(console.error);
