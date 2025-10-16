// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a disk access resource
 *
 * @summary creates or updates a disk access resource
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Create.json
 */
async function createADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.diskAccesses.createOrUpdate("myResourceGroup", "myDiskAccess", {
    location: "West US",
  });
}

async function main(): Promise<void> {
  await createADiskAccessResource();
}

main().catch(console.error);
