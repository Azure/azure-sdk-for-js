// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  DiskAccessesGetAPrivateEndpointConnectionParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets information about a private endpoint connection under a disk access resource.
 *
 * @summary Gets information about a private endpoint connection under a disk access resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskAccessExamples/DiskAccessPrivateEndpointConnection_Get.json
 */
async function getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const privateEndpointConnectionName = "myPrivateEndpointConnection";
  const options: DiskAccessesGetAPrivateEndpointConnectionParameters = {
    queryParameters: { "api-version": "2022-07-02" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}",
      subscriptionId,
      resourceGroupName,
      diskAccessName,
      privateEndpointConnectionName
    )
    .get(options);
  console.log(result);
}

getInformationAboutAPrivateEndpointConnectionUnderADiskAccessResource().catch(
  console.error
);
