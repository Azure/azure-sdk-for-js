// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get a HealthBot.
 *
 * @summary Get a HealthBot.
 * x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2021-06-10/examples/ResourceInfoGet.json
 */
async function resourceInfoGet(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "healthbotClient";
  const botName = "samplebotname";
  const credential = new DefaultAzureCredential();
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.get(resourceGroupName, botName);
  console.log(result);
}

resourceInfoGet().catch(console.error);
