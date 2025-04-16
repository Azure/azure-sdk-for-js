// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a UpdateRun
 *
 * @summary create a UpdateRun
 * x-ms-original-file: 2025-03-01/UpdateRuns_CreateOrUpdate.json
 */
async function createAnUpdateRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.createOrUpdate(
    "rg1",
    "fleet1",
    "run1",
    {
      properties: {
        updateStrategyId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ContainerService/fleets/myFleet/updateStrategies/strategy1",
        strategy: {
          stages: [
            {
              name: "stage1",
              groups: [{ name: "group-a" }],
              afterStageWaitInSeconds: 3600,
            },
          ],
        },
        managedClusterUpdate: {
          upgrade: { type: "Full", kubernetesVersion: "1.26.1" },
          nodeImageSelection: { type: "Latest" },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a UpdateRun
 *
 * @summary create a UpdateRun
 * x-ms-original-file: 2025-03-01/UpdateRuns_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createAnUpdateRunGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.createOrUpdate(
    "rgfleets",
    "fleet1",
    "fleet1",
    {
      properties: {
        updateStrategyId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ContainerService/fleets/myFleet/updateStrategies/strategy1",
        strategy: {
          stages: [
            {
              name: "stage1",
              groups: [{ name: "group-a" }],
              afterStageWaitInSeconds: 3600,
            },
          ],
        },
        managedClusterUpdate: {
          upgrade: { type: "Full", kubernetesVersion: "1.26.1" },
          nodeImageSelection: { type: "Latest", customNodeImageVersions: [{}] },
        },
        status: {
          status: { state: "NotStarted", error: {} },
          nodeImageSelection: {},
        },
        autoUpgradeProfileId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgfleets/providers/Microsoft.ContainerService/fleets/fleet1/autoUpgradeProfiles/aup1",
      },
    },
    { ifMatch: "wyolpuaxgybeygcbz", ifNoneMatch: "rwrhonlormgshamadufoo" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnUpdateRun();
  await createAnUpdateRunGeneratedByMaximumSetRule();
}

main().catch(console.error);
