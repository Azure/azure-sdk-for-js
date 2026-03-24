// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the given detector for a given Batch account.
 *
 * @summary gets information about the given detector for a given Batch account.
 * x-ms-original-file: 2025-06-01/DetectorGet.json
 */
async function getDetector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.getDetector(
    "default-azurebatch-japaneast",
    "sampleacct",
    "poolsAndNodes",
  );
  console.log(result);
}

async function main() {
  await getDetector();
}

main().catch(console.error);
