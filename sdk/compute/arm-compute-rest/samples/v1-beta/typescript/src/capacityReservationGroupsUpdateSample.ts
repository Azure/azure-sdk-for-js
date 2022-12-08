// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  CapacityReservationGroupsUpdateParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to update a capacity reservation group. When updating a capacity reservation group, only tags may be modified.
 *
 * @summary The operation to update a capacity reservation group. When updating a capacity reservation group, only tags may be modified.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/capacityReservationExamples/CapacityReservationGroup_Update_MaximumSet_Gen.json
 */
async function capacityReservationGroupsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const capacityReservationGroupName = "aaaaaaaaaaaaaaaaaaaaaa";
  const options: CapacityReservationGroupsUpdateParameters = {
    body: { properties: { instanceView: {} }, tags: { key5355: "aaa" } },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}",
      subscriptionId,
      resourceGroupName,
      capacityReservationGroupName
    )
    .patch(options);
  console.log(result);
}

capacityReservationGroupsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to update a capacity reservation group. When updating a capacity reservation group, only tags may be modified.
 *
 * @summary The operation to update a capacity reservation group. When updating a capacity reservation group, only tags may be modified.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/capacityReservationExamples/CapacityReservationGroup_Update_MinimumSet_Gen.json
 */
async function capacityReservationGroupsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const capacityReservationGroupName = "aaaaaaaaaaaaaaaaaaaaaa";
  const options: CapacityReservationGroupsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}",
      subscriptionId,
      resourceGroupName,
      capacityReservationGroupName
    )
    .patch(options);
  console.log(result);
}

capacityReservationGroupsUpdateMinimumSetGen().catch(console.error);
