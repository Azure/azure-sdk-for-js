// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a PlacementPolicy
 *
 * @summary create a PlacementPolicy
 * x-ms-original-file: 2024-09-01/PlacementPolicies_CreateOrUpdate.json
 */
async function placementPoliciesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.placementPolicies.createOrUpdate(
    "group1",
    "cloud1",
    "cluster1",
    "policy1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await placementPoliciesCreateOrUpdate();
}

main().catch(console.error);
