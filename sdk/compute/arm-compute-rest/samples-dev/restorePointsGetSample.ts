// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, { RestorePointsGetParameters } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to get the restore point.
 *
 * @summary The operation to get the restore point.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePoint_Get.json
 */
async function getARestorePoint() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "rpcName";
  const restorePointName = "rpName";
  const options: RestorePointsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
      restorePointName,
    )
    .get(options);
  console.log(result);
}

getARestorePoint().catch(console.error);
/**
 * This sample demonstrates how to The operation to get the restore point.
 *
 * @summary The operation to get the restore point.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePoint_Get_WithInstanceView.json
 */
async function getRestorePointWithInstanceView() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "rpcName";
  const restorePointName = "rpName";
  const options: RestorePointsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
      restorePointName,
    )
    .get(options);
  console.log(result);
}

getRestorePointWithInstanceView().catch(console.error);
