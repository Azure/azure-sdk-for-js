// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Alias Subscription.
 *
 * @summary list Alias Subscription.
 * x-ms-original-file: 2025-11-01-preview/listAlias.json
 */
async function listAlias() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.alias.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAlias();
}

main().catch(console.error);
