// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the available Service Providers for creating Connection Settings
 *
 * @summary lists the available Service Providers for creating Connection Settings
 * x-ms-original-file: 2023-09-15-preview/ListServiceProviders.json
 */
async function listAuthServiceProviders(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.botConnection.listServiceProviders();
  console.log(result);
}

async function main(): Promise<void> {
  await listAuthServiceProviders();
}

main().catch(console.error);
