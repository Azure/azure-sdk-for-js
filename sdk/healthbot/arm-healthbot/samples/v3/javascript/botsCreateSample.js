// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthbotClient } = require("@azure/arm-healthbot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new Azure Health Bot.
 *
 * @summary create a new Azure Health Bot.
 * x-ms-original-file: 2025-11-01/ResourceCreationPut.json
 */
async function botCreate() {
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

async function main() {
  await botCreate();
}

main().catch(console.error);
