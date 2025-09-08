// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a HealthBot.
 *
 * @summary Delete a HealthBot.
 * x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2021-06-10/examples/ResourceDeletionDelete.json
 */

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

async function botDelete(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "healthbotClient";
  const botName = "samplebotname";
  const credential = new DefaultAzureCredential();
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.beginDeleteAndWait(resourceGroupName, botName);
  console.log(result);
}

botDelete().catch(console.error);
