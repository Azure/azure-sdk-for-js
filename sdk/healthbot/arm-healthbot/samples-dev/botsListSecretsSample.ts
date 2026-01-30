// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all secrets of a HealthBot.
 *
 * @summary list all secrets of a HealthBot.
 * x-ms-original-file: 2025-11-01/ListSecrets.json
 */
async function botListSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.listSecrets("healthbotClient", "samplebotname");
  console.log(result);
}

async function main(): Promise<void> {
  await botListSecrets();
}

main().catch(console.error);
