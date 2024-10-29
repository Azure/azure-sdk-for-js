// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  RestorePointCollectionsUpdateParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to update the restore point collection.
 *
 * @summary The operation to update the restore point collection.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePointCollections_Update_MaximumSet_Gen.json
 */
async function restorePointCollectionsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const restorePointCollectionName = "aaaaaaaaaaaaaaaaaaaa";
  const options: RestorePointCollectionsUpdateParameters = {
    body: {
      properties: {
        source: {
          id:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM"
        }
      },
      tags: { key8536: "aaaaaaaaaaaaaaaaaaa" }
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
    .patch(options);
  console.log(result);
}

restorePointCollectionsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to update the restore point collection.
 *
 * @summary The operation to update the restore point collection.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/restorePointExamples/RestorePointCollections_Update_MinimumSet_Gen.json
 */
async function restorePointCollectionsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const restorePointCollectionName = "aaaaaaaaaaaaaaaaaa";
  const options: RestorePointCollectionsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}",
      subscriptionId,
      resourceGroupName,
      restorePointCollectionName
    )
    .patch(options);
  console.log(result);
}

restorePointCollectionsUpdateMinimumSetGen().catch(console.error);
