// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-resources-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets details about a specified subscription.
 *
 * @summary gets details about a specified subscription.
 * x-ms-original-file: 2022-12-01/GetSubscription.json
 */
async function getASingleSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.get("291bba3f-e0a5-47bc-a099-3bdcb2a50a05");
  console.log(result);
}

async function main(): Promise<void> {
  await getASingleSubscription();
}

main().catch(console.error);
