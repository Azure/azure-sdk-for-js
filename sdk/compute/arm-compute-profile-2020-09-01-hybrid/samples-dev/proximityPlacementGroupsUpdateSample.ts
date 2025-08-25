// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a proximity placement group.
 *
 * @summary Update a proximity placement group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2020-06-01/examples/PatchAProximityPlacementGroup.json
 */

import type { ProximityPlacementGroupUpdate } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createAProximityPlacementGroup(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const proximityPlacementGroupName = "myProximityPlacementGroup";
  const parameters: ProximityPlacementGroupUpdate = {
    tags: { additionalProp1: "string" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.update(
    resourceGroupName,
    proximityPlacementGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAProximityPlacementGroup();
}

main().catch(console.error);
