// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an availability set.
 *
 * @summary Update an availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/availabilitySetExamples/AvailabilitySet_Update_MaximumSet_Gen.json
 */

import {
  AvailabilitySetUpdate,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function availabilitySetUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const availabilitySetName = "aaaaaaaaaaaaaaaaaaa";
  const parameters: AvailabilitySetUpdate = {
    platformFaultDomainCount: 2,
    platformUpdateDomainCount: 20,
    proximityPlacementGroup: {
      id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
    },
    sku: { name: "DSv3-Type1", capacity: 7, tier: "aaa" },
    tags: { key2574: "aaaaaaaa" },
    virtualMachines: [
      {
        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.availabilitySets.update(
    resourceGroupName,
    availabilitySetName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update an availability set.
 *
 * @summary Update an availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/availabilitySetExamples/AvailabilitySet_Update_MinimumSet_Gen.json
 */
async function availabilitySetUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const availabilitySetName = "aaaaaaaaaaaaaaaaaaaa";
  const parameters: AvailabilitySetUpdate = {};
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.availabilitySets.update(
    resourceGroupName,
    availabilitySetName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await availabilitySetUpdateMaximumSetGen();
  await availabilitySetUpdateMinimumSetGen();
}

main().catch(console.error);
