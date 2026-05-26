// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-resources-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets details about a specified subscription.
 *
 * @summary gets details about a specified subscription.
 * x-ms-original-file: 2022-12-01/GetSubscription.json
 */
async function getASingleSubscription() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.get("291bba3f-e0a5-47bc-a099-3bdcb2a50a05");
  console.log(result);
}

async function main() {
  await getASingleSubscription();
}

main().catch(console.error);
