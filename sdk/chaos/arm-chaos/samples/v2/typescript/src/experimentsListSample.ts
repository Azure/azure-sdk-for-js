// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of Experiment resources in a resource group.
 *
 * @summary get a list of Experiment resources in a resource group.
 * x-ms-original-file: 2025-01-01/Experiments_List.json
 */
async function listAllExperimentsInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.experiments.list("exampleRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllExperimentsInAResourceGroup();
}

main().catch(console.error);
