// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create the restore point. Updating properties of an existing restore point is not allowed
 *
 * @summary The operation to create the restore point. Updating properties of an existing restore point is not allowed
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePoint_Copy_BetweenRegions.json
 */

import type { RestorePointsCreateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function copyARestorePointToADifferentRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "rpcName";
  const restorePointName = "rpName";
  const options: RestorePointsCreateParameters = {
    body: {
      properties: {
        sourceRestorePoint: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/restorePointCollections/sourceRpcName/restorePoints/sourceRpName",
        },
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
      restorePointName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

copyARestorePointToADifferentRegion().catch(console.error);
/**
 * This sample demonstrates how to The operation to create the restore point. Updating properties of an existing restore point is not allowed
 *
 * @summary The operation to create the restore point. Updating properties of an existing restore point is not allowed
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePoint_Create.json
 */
async function createARestorePoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const restorePointCollectionName = "rpcName";
  const restorePointName = "rpName";
  const options: RestorePointsCreateParameters = {
    body: {
      properties: {
        excludeDisks: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/disk123",
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName,
      restorePointName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createARestorePoint().catch(console.error);
