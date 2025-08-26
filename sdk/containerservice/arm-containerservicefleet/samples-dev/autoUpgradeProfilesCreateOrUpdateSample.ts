// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a AutoUpgradeProfile
 *
 * @summary create a AutoUpgradeProfile
 * x-ms-original-file: 2025-04-01-preview/AutoUpgradeProfiles_CreateOrUpdate.json
 */

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

async function createAnAutoUpgradeProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.autoUpgradeProfiles.createOrUpdate(
    "rg1",
    "fleet1",
    "autoupgradeprofile1",
    {
      properties: {
        targetKubernetesVersion: "",
        longTermSupport: false,
        channel: "Stable",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AutoUpgradeProfile
 *
 * @summary create a AutoUpgradeProfile
 * x-ms-original-file: 2025-04-01-preview/AutoUpgradeProfiles_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createAnAutoUpgradeProfileGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.autoUpgradeProfiles.createOrUpdate(
    "rgfleets",
    "fleet1",
    "autoupgradeprofile1",
    {
      properties: {
        channel: "Stable",
        updateStrategyId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgfleets/providers/Microsoft.ContainerService/fleets/fleet1/updateStrategies/strategy1",
        nodeImageSelection: { type: "Latest" },
        disabled: true,
      },
    },
    { ifMatch: "uktvayathbu", ifNoneMatch: "vdjolwxnefqamimybcvxxva" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnAutoUpgradeProfile();
  await createAnAutoUpgradeProfileGeneratedByMaximumSetRule();
}

main().catch(console.error);
