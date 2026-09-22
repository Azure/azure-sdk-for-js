// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-resources-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all subscriptions for a tenant.
 *
 * @summary gets all subscriptions for a tenant.
 * x-ms-original-file: 2022-12-01/GetSubscriptions.json
 */
async function getAllSubscriptions() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptions.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllSubscriptions();
}

main().catch(console.error);
