// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all edge machines in a subscription.
 *
 * @summary list all edge machines in a subscription.
 * x-ms-original-file: 2025-12-01-preview/EdgeMachines_ListBySubscription.json
 */
async function listEdgeMachinesInAGivenSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeMachines.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEdgeMachinesInAGivenSubscription();
}

main().catch(console.error);
