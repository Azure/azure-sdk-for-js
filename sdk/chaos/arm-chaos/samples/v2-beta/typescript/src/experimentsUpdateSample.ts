// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an experiment.
 *
 * @summary Update an experiment.
 * x-ms-original-file: 2026-05-01-preview/Experiments_Update.json
 */
async function updateAnExperimentInAResourceGroup(): Promise<void> {
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

async function main(): Promise<void> {
  await updateAnExperimentInAResourceGroup();
}

main().catch(console.error);
