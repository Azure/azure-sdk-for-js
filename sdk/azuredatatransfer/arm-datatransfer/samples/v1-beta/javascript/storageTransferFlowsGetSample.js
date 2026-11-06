// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets StorageTransferFlow resource.
 *
 * @summary gets StorageTransferFlow resource.
 * x-ms-original-file: 2026-06-29-preview/getStorageTransferFlow.json
 */
async function getsTheStorageTransferFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.storageTransferFlows.get("testRG", "testStorageTransferFlow");
  console.log(result);
}

async function main() {
  await getsTheStorageTransferFlow();
}

main().catch(console.error);
