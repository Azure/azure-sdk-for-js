// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a PlacementPolicy
 *
 * @summary update a PlacementPolicy
 * x-ms-original-file: 2025-09-01/PlacementPolicies_Update.json
 */
async function placementPoliciesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.placementPolicies.update("group1", "cloud1", "cluster1", "policy1", {
    state: "Disabled",
    vmMembers: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group1/providers/Microsoft.AVS/privateClouds/cloud1/clusters/cluster1/virtualMachines/vm-128",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group1/providers/Microsoft.AVS/privateClouds/cloud1/clusters/cluster1/virtualMachines/vm-256",
    ],
    hostMembers: [
      "fakehost22.nyc1.kubernetes.center",
      "fakehost23.nyc1.kubernetes.center",
      "fakehost24.nyc1.kubernetes.center",
    ],
    affinityStrength: "Must",
    azureHybridBenefitType: "SqlHost",
  });
  console.log(result);
}

async function main() {
  await placementPoliciesUpdate();
}

main().catch(console.error);
