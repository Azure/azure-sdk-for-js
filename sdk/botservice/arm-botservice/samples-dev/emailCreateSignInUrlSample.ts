// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates an email channel sign in url for a Bot Service
 *
 * @summary Creates an email channel sign in url for a Bot Service
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/CreateEmailSignInUrl.json
 */

import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createUrl(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const resourceGroupName = process.env["BOTSERVICE_RESOURCE_GROUP"] || "OneResourceGroupName";
  const resourceName = "samplebotname";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.email.createSignInUrl(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await createUrl();
}

main().catch(console.error);
