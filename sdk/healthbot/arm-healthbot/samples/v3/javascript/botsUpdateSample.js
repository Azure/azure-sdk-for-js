// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthbotClient } = require("@azure/arm-healthbot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch a HealthBot.
 *
 * @summary patch a HealthBot.
 * x-ms-original-file: 2025-11-01/ResourceUpdatePatch.json
 */
async function botUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.update("healthbotClient", "samplebotname", {
    sku: { name: "F0" },
  });
  console.log(result);
}

async function main() {
  await botUpdate();
}

main().catch(console.error);
