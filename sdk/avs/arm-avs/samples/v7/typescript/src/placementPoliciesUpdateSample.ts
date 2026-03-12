// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a PlacementPolicy
 *
 * @summary update a PlacementPolicy
 * x-ms-original-file: 2025-09-01/PlacementPolicies_Update.json
 */
async function placementPoliciesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.placementPolicies.update("group1", "cloud1", "cluster1", "policy1", {
    properties: {
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
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await placementPoliciesUpdate();
}

main().catch(console.error);
