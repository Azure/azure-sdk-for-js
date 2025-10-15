// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources possible under disk access resource
 *
 * @summary gets the private link resources possible under disk access resource
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateLinkResources_Get.json
 */
async function listAllPossiblePrivateLinkResourcesUnderDiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskAccesses.getPrivateLinkResources(
    "myResourceGroup",
    "myDiskAccess",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listAllPossiblePrivateLinkResourcesUnderDiskAccessResource();
}

main().catch(console.error);
