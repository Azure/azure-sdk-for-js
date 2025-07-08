// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel a running Experiment resource.
 *
 * @summary cancel a running Experiment resource.
 * x-ms-original-file: 2025-01-01/Experiments_Cancel.json
 */
async function cancelARunningExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.experiments.cancel("exampleRG", "exampleExperiment");
}

async function main() {
  await cancelARunningExperiment();
}

main().catch(console.error);
