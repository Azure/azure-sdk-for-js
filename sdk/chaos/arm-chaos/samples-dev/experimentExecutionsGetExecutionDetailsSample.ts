// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to execution details of an experiment resource.
 *
 * @summary execution details of an experiment resource.
 * x-ms-original-file: 2025-01-01/Experiments_ExecutionDetails.json
 */
async function getExperimentExecutionDetails(): Promise<void> {
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

async function main(): Promise<void> {
  await getExperimentExecutionDetails();
}

main().catch(console.error);
