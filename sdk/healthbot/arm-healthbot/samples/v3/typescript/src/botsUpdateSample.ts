// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch a HealthBot.
 *
 * @summary patch a HealthBot.
 * x-ms-original-file: 2025-11-01/ResourceUpdatePatch.json
 */
async function botUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.update("healthbotClient", "samplebotname", {
    sku: { name: "F0" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await botUpdate();
}

main().catch(console.error);
