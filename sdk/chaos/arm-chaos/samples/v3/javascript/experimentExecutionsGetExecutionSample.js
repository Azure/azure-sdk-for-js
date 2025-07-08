// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an execution of an Experiment resource.
 *
 * @summary get an execution of an Experiment resource.
 * x-ms-original-file: 2025-01-01/Experiments_GetExecution.json
 */
async function getTheExecutionOfAExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.experimentExecutions.getExecution(
    "exampleRG",
    "exampleExperiment",
    "f24500ad-744e-4a26-864b-b76199eac333",
  );
  console.log(result);
}

async function main() {
  await getTheExecutionOfAExperiment();
}

main().catch(console.error);
