// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DigitalAssetsClient } = require("@azure/arm-digitalassets");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Partition
 *
 * @summary delete a Partition
 * x-ms-original-file: 2025-09-01-preview/Partitions_Delete.json
 */
async function deletePartition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  await client.partitions.delete("testrg", "Jack", "Partition1");
}

async function main() {
  await deletePartition();
}

main().catch(console.error);
