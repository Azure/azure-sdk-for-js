// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the managed compute capacities for a subscription. Returns available capacity
 * per accelerator type, including deployment size information.
 *
 * @summary gets the managed compute capacities for a subscription. Returns available capacity
 * per accelerator type, including deployment size information.
 * x-ms-original-file: 2026-05-15-preview/ListManagedComputeCapacities.json
 */
async function listManagedComputeCapacities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedComputeCapacities.list("MaaP")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedComputeCapacities();
}

main().catch(console.error);
