// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate the API JWT Secret of a HealthBot.
 *
 * @summary regenerate the API JWT Secret of a HealthBot.
 * x-ms-original-file: 2025-11-01/RegenerateApiJwtSecret.json
 */
async function botRegenerateAPIJWTSecret(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.regenerateApiJwtSecret("healthbotClient", "samplebotname");
  console.log(result);
}

async function main(): Promise<void> {
  await botRegenerateAPIJWTSecret();
}

main().catch(console.error);
