// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthbotClient } = require("@azure/arm-healthbot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a HealthBot.
 *
 * @summary delete a HealthBot.
 * x-ms-original-file: 2025-11-01/ResourceDeletionDelete.json
 */
async function botDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  await client.bots.delete("healthbotClient", "samplebotname");
}

async function main() {
  await botDelete();
}

main().catch(console.error);
