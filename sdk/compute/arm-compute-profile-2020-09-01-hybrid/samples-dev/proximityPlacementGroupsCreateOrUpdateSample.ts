// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a proximity placement group.
 *
 * @summary Create or update a proximity placement group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2020-06-01/examples/CreateOrUpdateAProximityPlacementGroup.json
 */

import type { ProximityPlacementGroup } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAProximityPlacementGroup(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const proximityPlacementGroupName = "myProximityPlacementGroup";
  const parameters: ProximityPlacementGroup = {
    location: "westus",
    proximityPlacementGroupType: "Standard",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.createOrUpdate(
    resourceGroupName,
    proximityPlacementGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAProximityPlacementGroup();
}

main().catch(console.error);
