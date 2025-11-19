// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources possible under disk access resource
 *
 * @summary gets the private link resources possible under disk access resource
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateLinkResources_Get.json
 */
async function listAllPossiblePrivateLinkResourcesUnderDiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.diskAccesses.getPrivateLinkResources(
    "myResourceGroup",
    "myDiskAccess",
  );
  console.log(result);
}

async function main() {
  await listAllPossiblePrivateLinkResourcesUnderDiskAccessResource();
}

main().catch(console.error);
