// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation that retrieves information about a capacity reservation group.
 *
 * @summary The operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/capacityReservationExamples/CapacityReservationGroup_Get.json
 */

import type { CapacityReservationGroupsGetParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getACapacityReservationGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const capacityReservationGroupName = "myCapacityReservationGroup";
  const options: CapacityReservationGroupsGetParameters = {
    queryParameters: { $expand: "instanceView", "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}",
      subscriptionId,
      resourceGroupName,
      capacityReservationGroupName,
    )
    .get(options);
  console.log(result);
}

getACapacityReservationGroup().catch(console.error);
