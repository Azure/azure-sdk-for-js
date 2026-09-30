// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a UpdateRun
 *
 * @summary create a UpdateRun
 * x-ms-original-file: 2026-06-02-preview/UpdateRuns_CreateOrUpdate.json
 */
async function createAnUpdateRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.createOrUpdate("rg1", "fleet1", "run1", {
    properties: {
      updateStrategyId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ContainerService/fleets/myFleet/updateStrategies/strategy1",
      strategy: {
        stages: [
          {
            name: "stage1",
            maxConcurrency: "10",
            groups: [
              {
                name: "group-a",
                maxConcurrency: "2",
                memberSelector: { byLabel: "tier=frontend" },
                beforeGates: [{ displayName: "gate before group-a", type: "Approval" }],
                afterGates: [{ displayName: "gate after group-a", type: "Approval" }],
              },
            ],
            beforeGates: [{ displayName: "gate before stage1", type: "Approval" }],
            afterGates: [{ displayName: "gate after stage1", type: "Approval" }],
            afterStageWaitInSeconds: 3600,
          },
          {
            name: "stage2",
            maxConcurrency: "50%",
            memberSelector: { byLabel: "env=production" },
            beforeGates: [
              {
                displayName: "Wait until Friday evening",
                type: "ScheduledStart",
                scheduledStartConfiguration: {
                  startDay: "Friday",
                  startTime: "18:00",
                  utcOffset: "-05:00",
                },
              },
            ],
            afterStageWaitInSeconds: 600,
          },
        ],
      },
      managedClusterUpdate: {
        upgrade: { type: "Full", kubernetesVersion: "1.26.1" },
        nodeImageSelection: { type: "Latest" },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAnUpdateRun();
}

main().catch(console.error);
