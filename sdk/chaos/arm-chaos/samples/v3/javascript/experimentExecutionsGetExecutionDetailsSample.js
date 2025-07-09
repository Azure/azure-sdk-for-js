// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to execution details of an experiment resource.
 *
 * @summary execution details of an experiment resource.
 * x-ms-original-file: 2025-01-01/Experiments_ExecutionDetails.json
 */
async function getExperimentExecutionDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.experimentExecutions.getExecutionDetails(
    "exampleRG",
    "exampleExperiment",
    "f24500ad-744e-4a26-864b-b76199eac333",
  );
  console.log(result);
}

async function main() {
  await getExperimentExecutionDetails();
}

main().catch(console.error);
