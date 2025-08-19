// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the available Service Providers for creating Connection Settings
 *
 * @summary Lists the available Service Providers for creating Connection Settings
 * x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListServiceProviders.json
 */

import { AzureBotService } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAuthServiceProviders(): Promise<void> {
  const subscriptionId = process.env["BOTSERVICE_SUBSCRIPTION_ID"] || "subscription-id";
  const credential = new DefaultAzureCredential();
  const client = new AzureBotService(credential, subscriptionId);
  const result = await client.botConnection.listServiceProviders();
  console.log(result);
}

async function main(): Promise<void> {
  await listAuthServiceProviders();
}

main().catch(console.error);
