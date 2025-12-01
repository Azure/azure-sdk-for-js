// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a volume's bucket.
 *
 * @summary delete a volume's bucket.
 * x-ms-original-file: 2025-09-01-preview/Buckets_Delete.json
 */
async function bucketsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.buckets.delete("myRG", "account1", "pool1", "volume1", "bucket1");
}

async function main(): Promise<void> {
  await bucketsDelete();
}

main().catch(console.error);
