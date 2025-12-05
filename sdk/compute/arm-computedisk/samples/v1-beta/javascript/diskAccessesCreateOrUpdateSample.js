// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeDiskClient } = require("@azure/arm-computedisk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a disk access resource
 *
 * @summary creates or updates a disk access resource
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Create.json
 */
async function createADiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  await client.diskAccesses.createOrUpdate("myResourceGroup", "myDiskAccess", {
    location: "West US",
  });
}

async function main() {
  await createADiskAccessResource();
}

main().catch(console.error);
