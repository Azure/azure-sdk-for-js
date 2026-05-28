// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a subscription by its alias ID.  The operation is supported for seat based billing subscriptions.
 *
 * @summary gets a subscription by its alias ID.  The operation is supported for seat based billing subscriptions.
 * x-ms-original-file: 2024-04-01/billingSubscriptionAliasGet.json
 */
async function billingSubscriptionAliasGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptionsAliases.get(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "c356b7c7-7545-4686-b843-c1a49cf853fc",
  );
  console.log(result);
}

async function main() {
  await billingSubscriptionAliasGet();
}

main().catch(console.error);
