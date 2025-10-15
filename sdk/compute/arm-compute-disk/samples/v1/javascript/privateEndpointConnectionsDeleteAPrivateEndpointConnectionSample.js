// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-disk");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a private endpoint connection under a disk access resource.
 *
 * @summary deletes a private endpoint connection under a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Delete.json
 */
async function deleteAPrivateEndpointConnectionUnderADiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.privateEndpointConnections.deleteAPrivateEndpointConnection(
    "myResourceGroup",
    "myDiskAccess",
    "myPrivateEndpointConnection",
  );
}

async function main() {
  await deleteAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
