// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PlacementPolicy
 *
 * @summary delete a PlacementPolicy
 * x-ms-original-file: 2025-09-01/PlacementPolicies_Delete.json
 */
async function placementPoliciesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.placementPolicies.delete("group1", "cloud1", "cluster1", "policy1");
}

async function main() {
  await placementPoliciesDelete();
}

main().catch(console.error);
