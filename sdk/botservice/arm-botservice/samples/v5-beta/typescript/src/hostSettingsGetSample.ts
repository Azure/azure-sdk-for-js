// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceClient } from "@azure/arm-botservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get per subscription settings needed to host bot in compute resource such as Azure App Service
 *
 * @summary get per subscription settings needed to host bot in compute resource such as Azure App Service
 * x-ms-original-file: 2023-09-15-preview/GetHostSettings.json
 */
async function getBotHostSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new BotServiceClient(credential, subscriptionId);
  const result = await client.hostSettings.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getBotHostSettings();
}

main().catch(console.error);
