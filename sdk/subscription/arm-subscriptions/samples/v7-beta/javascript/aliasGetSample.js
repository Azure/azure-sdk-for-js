// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Alias Subscription.
 *
 * @summary get Alias Subscription.
 * x-ms-original-file: 2025-11-01-preview/getAlias.json
 */
async function getAlias() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.alias.get("dummyalias");
  console.log(result);
}

async function main() {
  await getAlias();
}

main().catch(console.error);
