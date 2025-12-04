// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeDiskClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a private endpoint connection under a disk access resource.
 *
 * @summary gets information about a private endpoint connection under a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Get.json
 */
async function getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  const result = await client.diskAccesses.getAPrivateEndpointConnection(
    "myResourceGroup",
    "myDiskAccess",
    "myPrivateEndpointConnection",
  );
  console.log(result);
}

async function main() {
  await getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
