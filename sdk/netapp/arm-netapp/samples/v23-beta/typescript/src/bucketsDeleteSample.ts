// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a volume's bucket.
 *
 * @summary delete a volume's bucket.
 * x-ms-original-file: 2025-12-15-preview/Buckets_Delete.json
 */
async function bucketsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.buckets.delete("myRG", "account1", "pool1", "volume1", "bucket1");
}

async function main(): Promise<void> {
  await bucketsDelete();
}

main().catch(console.error);
