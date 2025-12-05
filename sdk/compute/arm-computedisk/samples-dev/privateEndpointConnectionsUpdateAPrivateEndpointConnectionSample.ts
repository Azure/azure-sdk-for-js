// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeDiskClient } from "@azure/arm-computedisk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection.
 *
 * @summary approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Approve.json
 */
async function approveAPrivateEndpointConnectionUnderADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeDiskClient(credential, subscriptionId);
  await client.privateEndpointConnections.updateAPrivateEndpointConnection(
    "myResourceGroup",
    "myDiskAccess",
    "myPrivateEndpointConnection",
    {
      privateLinkServiceConnectionState: {
        status: "Approved",
        description: "Approving myPrivateEndpointConnection",
      },
    },
  );
}

async function main(): Promise<void> {
  await approveAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
