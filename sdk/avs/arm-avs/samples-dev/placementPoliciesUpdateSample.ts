// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a PlacementPolicy
 *
 * @summary update a PlacementPolicy
 * x-ms-original-file: 2024-09-01/PlacementPolicies_Update.json
 */
async function placementPoliciesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.placementPolicies.update(
    "group1",
    "cloud1",
    "cluster1",
    "policy1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await placementPoliciesUpdate();
}

main().catch(console.error);
