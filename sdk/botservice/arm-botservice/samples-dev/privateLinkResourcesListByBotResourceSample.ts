// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the private link resources that need to be created for a Bot.
 *
 * @summary Gets the private link resources that need to be created for a Bot.
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListPrivateLinkResources.json
 */

import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPrivateLinkResources(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "res6977";
  const resourceName = "sto2527";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.privateLinkResources.listByBotResource(
    resourceGroupName,
    resourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listPrivateLinkResources();
}

main().catch(console.error);
