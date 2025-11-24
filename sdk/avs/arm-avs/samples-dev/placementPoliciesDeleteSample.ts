// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a PlacementPolicy
 *
 * @summary delete a PlacementPolicy
 * x-ms-original-file: 2025-09-01/PlacementPolicies_Delete.json
 */
async function placementPoliciesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.placementPolicies.delete("group1", "cloud1", "cluster1", "policy1");
}

async function main(): Promise<void> {
  await placementPoliciesDelete();
}

main().catch(console.error);
