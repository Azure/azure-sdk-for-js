// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List information about private endpoint connections under a disk access resource
 *
 * @summary List information about private endpoint connections under a disk access resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskAccessExamples/DiskAccessPrivateEndpointConnection_ListByDiskAccess.json
 */

import type { DiskAccessesListPrivateEndpointConnectionsParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { paginate } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const options: DiskAccessesListPrivateEndpointConnectionsParameters = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections",
      subscriptionId,
      resourceGroupName,
      diskAccessName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource().catch(console.error);
