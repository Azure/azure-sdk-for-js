// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of private access resources in a subscription.
 *
 * @summary get a list of private access resources in a subscription.
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_ListAll.json
 */
async function listAllPrivateAccessesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateAccesses.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllPrivateAccessesInASubscription();
}

main().catch(console.error);
