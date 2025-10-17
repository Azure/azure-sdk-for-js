// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all proximity placement groups in a subscription.
 *
 * @summary lists all proximity placement groups in a subscription.
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_ListBySubscription.json
 */
async function listProximityPlacementGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.proximityPlacementGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listProximityPlacementGroups();
}

main().catch(console.error);
