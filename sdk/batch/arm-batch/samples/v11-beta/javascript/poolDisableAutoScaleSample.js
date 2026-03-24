// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables automatic scaling for a pool.
 *
 * @summary disables automatic scaling for a pool.
 * x-ms-original-file: 2025-06-01/PoolDisableAutoScale.json
 */
async function disableAutoScale() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.disableAutoScale(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
  );
  console.log(result);
}

async function main() {
  await disableAutoScale();
}

main().catch(console.error);
