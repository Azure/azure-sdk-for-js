// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to delete the restore point collection. This operation will also delete all the contained restore points.
 *
 * @summary The operation to delete the restore point collection. This operation will also delete all the contained restore points.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePointCollections_Delete_MaximumSet_Gen.json
 */

import type { RestorePointCollectionsDeleteParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function restorePointCollectionsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const restorePointCollectionName = "aaaaaaaaaaaaaaaaa";
  const options: RestorePointCollectionsDeleteParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
    )
    .delete(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

restorePointCollectionsDeleteMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to delete the restore point collection. This operation will also delete all the contained restore points.
 *
 * @summary The operation to delete the restore point collection. This operation will also delete all the contained restore points.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePointCollections_Delete_MinimumSet_Gen.json
 */
async function restorePointCollectionsDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const restorePointCollectionName = "aaaaaaaaaaaaaaaaaaaa";
  const options: RestorePointCollectionsDeleteParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
    )
    .delete(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

restorePointCollectionsDeleteMinimumSetGen().catch(console.error);
