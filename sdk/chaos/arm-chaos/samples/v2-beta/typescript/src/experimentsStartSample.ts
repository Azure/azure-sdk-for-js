// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to start a Experiment resource.
 *
 * @summary start a Experiment resource.
 * x-ms-original-file: 2026-05-01-preview/Experiments_Start.json
 */
async function startAExperiment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.experiments.start("exampleRG", "exampleExperiment");
}

async function main(): Promise<void> {
  await startAExperiment();
}

main().catch(console.error);
