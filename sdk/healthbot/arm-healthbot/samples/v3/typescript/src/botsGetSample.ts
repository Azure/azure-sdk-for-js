// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a HealthBot.
 *
 * @summary get a HealthBot.
 * x-ms-original-file: 2025-11-01/ResourceInfoGet.json
 */
async function resourceInfoGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.get("healthbotClient", "samplebotname");
  console.log(result);
}

async function main(): Promise<void> {
  await resourceInfoGet();
}

main().catch(console.error);
