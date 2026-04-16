// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthbotClient } from "@azure/arm-healthbot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Azure Health Bot.
 *
 * @summary create a new Azure Health Bot.
 * x-ms-original-file: 2025-11-01/ResourceCreationPut.json
 */
async function botCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.create("healthbotClient", "samplebotname", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subscription-id/resourcegroups/myrg/providers/microsoft.managedidentity/userassignedidentities/my-mi":
          {},
        "/subscriptions/subscription-id/resourcegroups/myrg/providers/microsoft.managedidentity/userassignedidentities/my-mi2":
          {},
      },
    },
    location: "East US",
    sku: { name: "F0" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await botCreate();
}

main().catch(console.error);
