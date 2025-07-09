// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Experiment resource.
 *
 * @summary delete a Experiment resource.
 * x-ms-original-file: 2025-01-01/Experiments_Delete.json
 */
async function deleteAExperimentInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.experiments.delete("exampleRG", "exampleExperiment");
}

async function main() {
  await deleteAExperimentInAResourceGroup();
}

main().catch(console.error);
