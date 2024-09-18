// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  DiskAccessesGetPrivateLinkResourcesParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the private link resources possible under disk access resource
 *
 * @summary Gets the private link resources possible under disk access resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2022-07-02/examples/diskAccessExamples/DiskAccessPrivateLinkResources_Get.json
 */
async function listAllPossiblePrivateLinkResourcesUnderDiskAccessResource() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const options: DiskAccessesGetPrivateLinkResourcesParameters = {
    queryParameters: { "api-version": "2022-07-02" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateLinkResources",
      subscriptionId,
      resourceGroupName,
      diskAccessName,
    )
    .get(options);
  console.log(result);
}

listAllPossiblePrivateLinkResourcesUnderDiskAccessResource().catch(console.error);
