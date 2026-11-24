// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DigitalAssetsClient } = require("@azure/arm-digitalassets");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a partition.
 *
 * @summary creates or replaces a partition.
 * x-ms-original-file: 2025-09-01-preview/Partitions_CreateOrUpdate.json
 */
async function createPartition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.partitions.createOrUpdate("testrg", "Jack", "Partition1", {
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await createPartition();
}

main().catch(console.error);
