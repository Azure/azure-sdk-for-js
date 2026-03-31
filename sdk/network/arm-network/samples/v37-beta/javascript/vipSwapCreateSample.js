// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to performs vip swap operation on swappable cloud services.
 *
 * @summary performs vip swap operation on swappable cloud services.
 * x-ms-original-file: 2025-05-01/CloudServiceSwapPut.json
 */
async function putVipSwapOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.vipSwap.create("rg1", "testCloudService", {
    properties: { slotType: "Production" },
  });
}

async function main() {
  await putVipSwapOperation();
}

main().catch(console.error);
