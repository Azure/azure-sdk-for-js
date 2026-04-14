// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a FleetUpdateStrategy
 *
 * @summary create a FleetUpdateStrategy
 * x-ms-original-file: 2026-02-01-preview/UpdateStrategies_CreateOrUpdate.json
 */
async function createAFleetUpdateStrategy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetUpdateStrategies.createOrUpdate("rg1", "fleet1", "strategy1", {
    properties: {
      strategy: {
        stages: [
          {
            name: "stage1",
            maxConcurrency: "20%",
            groups: [
              {
                name: "group-a",
                maxConcurrency: "5",
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

async function main() {
  await createAFleetUpdateStrategy();
}

main().catch(console.error);
