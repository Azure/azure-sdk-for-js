// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the storage transfer flow resource.
 *
 * @summary deletes the storage transfer flow resource.
 * x-ms-original-file: 2026-06-29-preview/deleteStorageTransferFlow.json
 */
async function deletesTheStorageTransferFlow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.storageTransferFlows.delete("testRG", "testStorageTransferFlow");
}

async function main() {
  await deletesTheStorageTransferFlow();
}

main().catch(console.error);
