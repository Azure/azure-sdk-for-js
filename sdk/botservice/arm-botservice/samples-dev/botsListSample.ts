// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns all the resources of a particular type belonging to a subscription.
 *
 * @summary Returns all the resources of a particular type belonging to a subscription.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListBotsBySubscription.json
 */

import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listBotsBySubscription(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
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
