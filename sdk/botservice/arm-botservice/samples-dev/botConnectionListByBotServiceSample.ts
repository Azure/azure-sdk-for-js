// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns all the Connection Settings registered to a particular BotService resource
 *
 * @summary Returns all the Connection Settings registered to a particular BotService resource
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListConnectionsByBotService.json
 */
async function listConnectionSettings(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.botConnection.listByBotService(resourceGroupName, resourceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listConnectionSettings();
}

main().catch(console.error);
