// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the Batch accounts associated with the specified resource group.
 *
 * @summary gets information about the Batch accounts associated with the specified resource group.
 * x-ms-original-file: 2025-06-01/BatchAccountListByResourceGroup.json
 */
async function batchAccountListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.batchAccount.listByResourceGroup(
    "default-azurebatch-japaneast",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await batchAccountListByResourceGroup();
}

main().catch(console.error);
