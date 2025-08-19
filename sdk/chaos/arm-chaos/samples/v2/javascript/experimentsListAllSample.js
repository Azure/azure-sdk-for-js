// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of Experiment resources in a subscription.
 *
 * @summary get a list of Experiment resources in a subscription.
 * x-ms-original-file: 2025-01-01/Experiments_ListAll.json
 */
async function listAllExperimentsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.experiments.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllExperimentsInASubscription();
}

main().catch(console.error);
