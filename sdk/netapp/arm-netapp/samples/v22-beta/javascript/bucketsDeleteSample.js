// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a volume's bucket.
 *
 * @summary delete a volume's bucket.
 * x-ms-original-file: 2025-07-01-preview/Buckets_Delete.json
 */
async function bucketsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.buckets.delete("myRG", "account1", "pool1", "volume1", "bucket1");
}

async function main() {
  await bucketsDelete();
}

main().catch(console.error);
