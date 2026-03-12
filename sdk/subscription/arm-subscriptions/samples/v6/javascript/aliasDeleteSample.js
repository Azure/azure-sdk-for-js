// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete Alias.
 *
 * @summary Delete Alias.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/deleteAlias.json
 */
async function deleteAlias() {
  const aliasName = "aliasForNewSub";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.alias.delete(aliasName);
  console.log(result);
}

async function main() {
  await deleteAlias();
}

main().catch(console.error);
