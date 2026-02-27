// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeClient } from "@azure/arm-disconnectedoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DisconnectedOperation resources by subscription ID
 *
 * @summary list DisconnectedOperation resources by subscription ID
 * x-ms-original-file: 2026-03-15/DisconnectedOperations_ListBySubscription_MaximumSet_Gen.json
 */
async function disconnectedOperationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1F6CACA0-5FFA-47AD-94FD-42368F71E49E";
  const client = new EdgeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disconnectedOperations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await disconnectedOperationsListBySubscription();
}

main().catch(console.error);
