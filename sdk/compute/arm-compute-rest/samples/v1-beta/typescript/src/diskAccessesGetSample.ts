// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, { DiskAccessesGetParameters } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets information about a disk access resource.
 *
 * @summary Gets information about a disk access resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskAccessExamples/DiskAccess_Get_WithPrivateEndpoints.json
 */
async function getInformationAboutADiskAccessResourceWithPrivateEndpoints() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const options: DiskAccessesGetParameters = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}",
      subscriptionId,
      resourceGroupName,
      diskAccessName,
    )
    .get(options);
  console.log(result);
}

getInformationAboutADiskAccessResourceWithPrivateEndpoints().catch(console.error);
/**
 * This sample demonstrates how to Gets information about a disk access resource.
 *
 * @summary Gets information about a disk access resource.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskAccessExamples/DiskAccess_Get.json
 */
async function getInformationAboutADiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const options: DiskAccessesGetParameters = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}",
      subscriptionId,
      resourceGroupName,
      diskAccessName,
    )
    .get(options);
  console.log(result);
}

getInformationAboutADiskAccessResource().catch(console.error);
