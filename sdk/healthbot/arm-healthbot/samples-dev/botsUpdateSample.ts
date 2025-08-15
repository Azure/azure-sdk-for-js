// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthBotUpdateParameters } from "@azure/arm-healthbot";
import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Patch a HealthBot.
 *
 * @summary Patch a HealthBot.
 * x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2021-06-10/examples/ResourceUpdatePatch.json
 */
async function botUpdate(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "healthbotClient";
  const botName = "samplebotname";
  const parameters: HealthBotUpdateParameters = { sku: { name: "F0" } };
  const credential = new DefaultAzureCredential();
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.update(resourceGroupName, botName, parameters);
  console.log(result);
}

botUpdate().catch(console.error);
