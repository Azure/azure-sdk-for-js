// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthbotClient } = require("@azure/arm-healthbot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all the resources of a particular type belonging to a subscription.
 *
 * @summary returns all the resources of a particular type belonging to a subscription.
 * x-ms-original-file: 2025-11-01/ListBotsBySubscription.json
 */
async function listBotsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscription-id";
  const client = new HealthbotClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bots.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBotsBySubscription();
}

main().catch(console.error);
