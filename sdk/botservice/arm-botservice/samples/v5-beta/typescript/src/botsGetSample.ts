// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a BotService specified by the parameters.
 *
 * @summary returns a BotService specified by the parameters.
 * x-ms-original-file: 2023-09-15-preview/GetBot.json
 */
async function getBot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.bots.get("OneResourceGroupName", "samplebotname");
  console.log(result);
}

async function main(): Promise<void> {
  await getBot();
}

main().catch(console.error);
