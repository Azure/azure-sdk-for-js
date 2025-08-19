// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a proximity placement group.
 *
 * @summary Delete a proximity placement group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/proximityPlacementGroupExamples/ProximityPlacementGroup_Delete.json
 */

import type { ProximityPlacementGroupsDeleteParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createAProximityPlacementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const proximityPlacementGroupName = "myProximityPlacementGroup";
  const options: ProximityPlacementGroupsDeleteParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}",
      subscriptionId,
      resourceGroupName,
      proximityPlacementGroupName,
    )
    .delete(options);
  console.log(result);
}

createAProximityPlacementGroup().catch(console.error);
