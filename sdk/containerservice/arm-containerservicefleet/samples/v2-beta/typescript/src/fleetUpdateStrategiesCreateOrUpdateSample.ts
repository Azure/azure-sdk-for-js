// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a FleetUpdateStrategy
 *
 * @summary create a FleetUpdateStrategy
 * x-ms-original-file: 2025-04-01-preview/FleetUpdateStrategies_CreateOrUpdate_MaximumSet_Gen.json
 */

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

async function createAFleetUpdateStrategyGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetUpdateStrategies.createOrUpdate(
    "rgfleets",
    "fleet1",
    "fleet1",
    {
      properties: {
        strategy: {
          stages: [
            {
              name: "stage1",
              groups: [{ name: "group-a" }],
              afterStageWaitInSeconds: 3600,
            },
          ],
        },
      },
    },
    { ifMatch: "bttptpmhheves", ifNoneMatch: "tlx" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a FleetUpdateStrategy
 *
 * @summary create a FleetUpdateStrategy
 * x-ms-original-file: 2025-04-01-preview/UpdateStrategies_CreateOrUpdate.json
 */
async function createAFleetUpdateStrategy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetUpdateStrategies.createOrUpdate("rg1", "fleet1", "strategy1", {
    properties: {
      strategy: {
        stages: [
          {
            name: "stage1",
            groups: [
              {
                name: "group-a",
                beforeGates: [{ displayName: "gate before group-a", type: "Approval" }],
                afterGates: [{ displayName: "gate after group-a", type: "Approval" }],
              },
            ],
            beforeGates: [{ displayName: "gate before stage1", type: "Approval" }],
            afterGates: [{ displayName: "gate after stage1", type: "Approval" }],
            afterStageWaitInSeconds: 3600,
          },
        ],
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAFleetUpdateStrategyGeneratedByMaximumSetRule();
  await createAFleetUpdateStrategy();
}

main().catch(console.error);
