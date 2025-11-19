// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list information about private endpoint connections under a disk access resource
 *
 * @summary list information about private endpoint connections under a disk access resource
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_ListByDiskAccess.json
 */
async function getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskAccesses.listPrivateEndpointConnections(
    "myResourceGroup",
    "myDiskAccess",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
