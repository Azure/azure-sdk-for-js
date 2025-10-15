// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a private endpoint connection under a disk access resource.
 *
 * @summary gets information about a private endpoint connection under a disk access resource.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Get.json
 */
async function getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.getAPrivateEndpointConnection(
    "myResourceGroup",
    "myDiskAccess",
    "myPrivateEndpointConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
