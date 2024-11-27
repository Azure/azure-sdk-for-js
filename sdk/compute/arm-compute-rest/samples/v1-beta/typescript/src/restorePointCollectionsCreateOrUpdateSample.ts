// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  RestorePointCollectionsCreateOrUpdateParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 *
 * @summary The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePointCollection_CreateOrUpdate_ForCrossRegionCopy.json
 */
async function createOrUpdateARestorePointCollectionForCrossRegionCopy() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "myRpc";
  const options: RestorePointCollectionsCreateOrUpdateParameters = {
    body: {
      location: "norwayeast",
      properties: {
        source: {
          id:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/restorePointCollections/sourceRpcName"
        }
      },
      tags: { myTag1: "tagValue1" }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName
    )
    .put(options);
  console.log(result);
}

createOrUpdateARestorePointCollectionForCrossRegionCopy().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 *
 * @summary The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePointCollection_CreateOrUpdate.json
 */
async function createOrUpdateARestorePointCollection() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "myRpc";
  const options: RestorePointCollectionsCreateOrUpdateParameters = {
    body: {
      location: "norwayeast",
      properties: {
        source: {
          id:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM"
        }
      },
      tags: { myTag1: "tagValue1" }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName
    )
    .put(options);
  console.log(result);
}

createOrUpdateARestorePointCollection().catch(console.error);
