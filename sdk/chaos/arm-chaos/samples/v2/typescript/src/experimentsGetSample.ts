// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Experiment resource.
 *
 * @summary get a Experiment resource.
 * x-ms-original-file: 2025-01-01/Experiments_Get.json
 */
async function getAExperimentInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.experiments.get("exampleRG", "exampleExperiment");
  console.log(result);
}

async function main(): Promise<void> {
  await getAExperimentInAResourceGroup();
}

main().catch(console.error);
