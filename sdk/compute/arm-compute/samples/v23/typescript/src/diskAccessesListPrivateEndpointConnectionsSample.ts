// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List information about private endpoint connections under a disk access resource
 *
 * @summary List information about private endpoint connections under a disk access resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskAccessExamples/DiskAccessPrivateEndpointConnection_ListByDiskAccess.json
 */
async function getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskAccesses.listPrivateEndpointConnections(
    resourceGroupName,
    diskAccessName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
