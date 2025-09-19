// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProximityPlacementGroupUpdate,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a proximity placement group.
 *
 * @summary Update a proximity placement group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/proximityPlacementGroupExamples/ProximityPlacementGroup_Patch.json
 */
async function updateAProximityPlacementGroup(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
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
  await updateAProximityPlacementGroup();
}

main().catch(console.error);
