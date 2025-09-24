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
    {
      properties: {
        type: "VmHost",
        vmMembers: [
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group1/providers/Microsoft.AVS/privateClouds/cloud1/clusters/cluster1/virtualMachines/vm-128",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group1/providers/Microsoft.AVS/privateClouds/cloud1/clusters/cluster1/virtualMachines/vm-256",
        ],
        hostMembers: [
          "fakehost22.nyc1.kubernetes.center",
          "fakehost23.nyc1.kubernetes.center",
          "fakehost24.nyc1.kubernetes.center",
        ],
        affinityType: "AntiAffinity",
        affinityStrength: "Must",
        azureHybridBenefitType: "SqlHost",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await placementPoliciesCreateOrUpdate();
}

main().catch(console.error);
