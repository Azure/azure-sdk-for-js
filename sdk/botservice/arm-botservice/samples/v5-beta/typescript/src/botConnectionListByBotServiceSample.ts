// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns all the Connection Settings registered to a particular BotService resource
 *
 * @summary returns all the Connection Settings registered to a particular BotService resource
 * x-ms-original-file: 2023-09-15-preview/ListConnectionsByBotService.json
 */
async function listConnectionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.botConnection.listByBotService(
    "OneResourceGroupName",
    "samplebotname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectionSettings();
}

main().catch(console.error);
