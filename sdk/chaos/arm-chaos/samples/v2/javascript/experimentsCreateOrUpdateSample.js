// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Experiment resource.
 *
 * @summary create or update a Experiment resource.
 * x-ms-original-file: 2025-01-01/Experiments_CreateOrUpdate.json
 */
async function createOrUpdateAExperimentInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.experiments.createOrUpdate("exampleRG", "exampleExperiment", {
    identity: { type: "SystemAssigned" },
    tags: { key7131: "ryohwcoiccwsnewjigfmijz", key2138: "fjaeecgnvqd" },
    location: "eastus2euap",
    properties: {
      selectors: [
        {
          type: "List",
          id: "selector1",
          targets: [
            {
              type: "ChaosTarget",
              id: "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Compute/virtualMachines/exampleVM/providers/Microsoft.Chaos/targets/Microsoft-VirtualMachine",
            },
          ],
        },
      ],
      steps: [
        {
          name: "step1",
          branches: [
            {
              name: "branch1",
              actions: [
                {
                  name: "urn:csci:microsoft:virtualMachine:shutdown/1.0",
                  type: "continuous",
                  duration: "PT10M",
                  parameters: [{ key: "abruptShutdown", value: "false" }],
                  selectorId: "selector1",
                },
              ],
            },
          ],
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAExperimentInAResourceGroup();
}

main().catch(console.error);
