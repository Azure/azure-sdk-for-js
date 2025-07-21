// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns all the resources of a particular type belonging to a subscription.
 *
 * @summary returns all the resources of a particular type belonging to a subscription.
 * x-ms-original-file: 2023-09-15-preview/ListBotsBySubscription.json
 */
async function listBotsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bots.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listBotsBySubscription();
}

main().catch(console.error);
