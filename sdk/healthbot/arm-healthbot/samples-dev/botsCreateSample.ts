// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a new Azure Health Bot.
 *
 * @summary Create a new Azure Health Bot.
 * x-ms-original-file: specification/healthbot/resource-manager/Microsoft.HealthBot/stable/2021-06-10/examples/ResourceCreationPut.json
 */

import type { HealthBot } from "@azure/arm-healthbot";
import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

async function botCreate(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "healthbotClient";
  const botName = "samplebotname";
  const parameters: HealthBot = {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subscriptionId/resourcegroups/myrg/providers/microsoftManagedidentity/userassignedidentities/myMi":
          {},
        "/subscriptions/subscriptionId/resourcegroups/myrg/providers/microsoftManagedidentity/userassignedidentities/myMi2":
          {},
      },
    },
    location: "East US",
    sku: { name: "F0" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.beginCreateAndWait(resourceGroupName, botName, parameters);
  console.log(result);
}

botCreate().catch(console.error);
