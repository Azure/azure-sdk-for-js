// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all resources that are encrypted with this disk encryption set.
 *
 * @summary lists all resources that are encrypted with this disk encryption set.
 * x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_ListAssociatedResources.json
 */
async function listAllResourcesThatAreEncryptedWithThisDiskEncryptionSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskEncryptionSets.listAssociatedResources(
    "myResourceGroup",
    "myDiskEncryptionSet",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllResourcesThatAreEncryptedWithThisDiskEncryptionSet();
}

main().catch(console.error);
