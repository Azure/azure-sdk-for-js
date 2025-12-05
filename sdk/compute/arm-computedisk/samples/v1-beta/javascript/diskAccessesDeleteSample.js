// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computedisk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a disk access resource.
 *
 * @summary deletes a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Delete.json
 */
async function deleteADiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskAccesses.delete("myResourceGroup", "myDiskAccess");
}

async function main() {
  await deleteADiskAccessResource();
}

main().catch(console.error);
