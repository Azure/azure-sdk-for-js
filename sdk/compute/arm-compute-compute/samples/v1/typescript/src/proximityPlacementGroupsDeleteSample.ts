// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a proximity placement group.
 *
 * @summary delete a proximity placement group.
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_Delete.json
 */
async function deleteAProximityPlacementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.proximityPlacementGroups.delete("myResourceGroup", "myProximityPlacementGroup");
}

async function main(): Promise<void> {
  await deleteAProximityPlacementGroup();
}

main().catch(console.error);
