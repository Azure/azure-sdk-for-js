// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Bot.
 *
 * @summary gets the private link resources that need to be created for a Bot.
 * x-ms-original-file: 2023-09-15-preview/ListPrivateLinkResources.json
 */
async function listPrivateLinkResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByBotResource("res6977", "sto2527");
  console.log(result);
}

async function main(): Promise<void> {
  await listPrivateLinkResources();
}

main().catch(console.error);
