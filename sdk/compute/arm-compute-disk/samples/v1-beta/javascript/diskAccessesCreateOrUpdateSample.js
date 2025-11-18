// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
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
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskAccesses.createOrUpdate("myResourceGroup", "myDiskAccess", {
    location: "West US",
  });
  console.log(result);
}

async function main() {
  await createADiskAccessResource();
}

main().catch(console.error);
