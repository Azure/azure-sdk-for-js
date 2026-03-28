// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-resources-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all subscriptions for a tenant.
 *
 * @summary gets all subscriptions for a tenant.
 * x-ms-original-file: 2022-12-01/GetSubscriptions.json
 */
async function getAllSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptions.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllSubscriptions();
}

main().catch(console.error);
