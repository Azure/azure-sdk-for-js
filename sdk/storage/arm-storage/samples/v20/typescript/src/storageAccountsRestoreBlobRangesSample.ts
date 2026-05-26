// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restore blobs in the specified blob ranges
 *
 * @summary restore blobs in the specified blob ranges
 * x-ms-original-file: 2025-08-01/BlobRangesRestore.json
 */
async function blobRangesRestore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.restoreBlobRanges("res9101", "sto4445", {
    blobRanges: [
      { endRange: "container/blobpath2", startRange: "container/blobpath1" },
      { endRange: "", startRange: "container2/blobpath3" },
    ],
    timeToRestore: new Date("2019-04-20T15:30:00.0000000Z"),
  });
  console.log(result);
}

async function main(): Promise<void> {
  await blobRangesRestore();
}

main().catch(console.error);
