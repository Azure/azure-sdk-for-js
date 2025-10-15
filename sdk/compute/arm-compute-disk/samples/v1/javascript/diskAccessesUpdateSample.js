// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates (patches) a disk access resource.
 *
 * @summary updates (patches) a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Update.json
 */
async function updateADiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskAccesses.update("myResourceGroup", "myDiskAccess", {
    tags: { department: "Development", project: "PrivateEndpoints" },
  });
}

async function main() {
  await updateADiskAccessResource();
}

main().catch(console.error);
