// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified Batch account.
 *
 * @summary gets information about the specified Batch account.
 * x-ms-original-file: 2025-06-01/BatchAccountGet.json
 */
async function batchAccountGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.get("default-azurebatch-japaneast", "sampleacct");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified Batch account.
 *
 * @summary gets information about the specified Batch account.
 * x-ms-original-file: 2025-06-01/PrivateBatchAccountGet.json
 */
async function privateBatchAccountGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.get("default-azurebatch-japaneast", "sampleacct");
  console.log(result);
}

async function main() {
  await batchAccountGet();
  await privateBatchAccountGet();
}

main().catch(console.error);
