// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Alias.
 *
 * @summary delete Alias.
 * x-ms-original-file: 2025-11-01-preview/deleteAlias.json
 */
async function deleteAlias() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  await client.alias.delete("dummyalias");
}

async function main() {
  await deleteAlias();
}

main().catch(console.error);
