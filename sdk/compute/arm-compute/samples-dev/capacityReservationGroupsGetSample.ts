// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation that retrieves information about a capacity reservation group.
 *
 * @summary The operation that retrieves information about a capacity reservation group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/capacityReservationExamples/CapacityReservationGroup_Get.json
 */

import {
  CapacityReservationGroupsGetOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getACapacityReservationGroup(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const capacityReservationGroupName = "myCapacityReservationGroup";
  const expand = "instanceView";
  const options: CapacityReservationGroupsGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.capacityReservationGroups.get(
    resourceGroupName,
    capacityReservationGroupName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACapacityReservationGroup();
}

main().catch(console.error);
