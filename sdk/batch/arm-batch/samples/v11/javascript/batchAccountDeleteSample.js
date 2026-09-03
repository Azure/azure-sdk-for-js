// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Batch account.
 *
 * @summary deletes the specified Batch account.
 * x-ms-original-file: 2025-06-01/BatchAccountDelete.json
 */
async function batchAccountDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.batchAccount.delete("default-azurebatch-japaneast", "sampleacct");
}

async function main() {
  await batchAccountDelete();
}

main().catch(console.error);
