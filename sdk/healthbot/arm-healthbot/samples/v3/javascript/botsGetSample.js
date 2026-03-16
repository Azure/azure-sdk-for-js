// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthbotClient } = require("@azure/arm-healthbot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a HealthBot.
 *
 * @summary get a HealthBot.
 * x-ms-original-file: 2025-11-01/ResourceInfoGet.json
 */
async function resourceInfoGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthbotClient(credential, subscriptionId);
  const result = await client.bots.get("healthbotClient", "samplebotname");
  console.log(result);
}

async function main() {
  await resourceInfoGet();
}

main().catch(console.error);
