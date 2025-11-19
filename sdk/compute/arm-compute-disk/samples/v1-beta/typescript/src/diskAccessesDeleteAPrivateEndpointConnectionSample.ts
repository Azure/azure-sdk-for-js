// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a private endpoint connection under a disk access resource.
 *
 * @summary deletes a private endpoint connection under a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Delete.json
 */
async function deleteAPrivateEndpointConnectionUnderADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.diskAccesses.deleteAPrivateEndpointConnection(
    "myResourceGroup",
    "myDiskAccess",
    "myPrivateEndpointConnection",
  );
}

async function main(): Promise<void> {
  await deleteAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
