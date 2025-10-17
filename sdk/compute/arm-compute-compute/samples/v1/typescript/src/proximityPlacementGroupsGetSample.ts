// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves information about a proximity placement group .
 *
 * @summary retrieves information about a proximity placement group .
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_Get.json
 */
async function getProximityPlacementGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.get(
    "myResourceGroup",
    "myProximityPlacementGroup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProximityPlacementGroups();
}

main().catch(console.error);
