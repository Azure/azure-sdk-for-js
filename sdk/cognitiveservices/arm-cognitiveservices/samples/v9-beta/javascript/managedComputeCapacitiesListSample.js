// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the managed compute capacities for a subscription. Returns available capacity
 * per accelerator type, including deployment size information.
 *
 * @summary gets the managed compute capacities for a subscription. Returns available capacity
 * per accelerator type, including deployment size information.
 * x-ms-original-file: 2026-03-15-preview/ListManagedComputeCapacities.json
 */
async function listManagedComputeCapacities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedComputeCapacities.list("MaaP")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedComputeCapacities();
}

main().catch(console.error);
