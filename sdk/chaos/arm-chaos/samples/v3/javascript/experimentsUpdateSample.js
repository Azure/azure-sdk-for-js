// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update an experiment.
 *
 * @summary the operation to update an experiment.
 * x-ms-original-file: 2025-01-01/Experiments_Update.json
 */
async function updateAnExperimentInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.experiments.update("exampleRG", "exampleExperiment", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.ManagedIdentity/userAssignedIdentity/exampleUMI":
          {},
      },
    },
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateAnExperimentInAResourceGroup();
}

main().catch(console.error);
