// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Billing Account Policy.
 *
 * @summary get Billing Account Policy.
 * x-ms-original-file: 2025-11-01-preview/getBillingAccountPolicy.json
 */
async function getBillingAccountPolicy() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.billingAccount.getPolicy("testBillingAccountId");
  console.log(result);
}

async function main() {
  await getBillingAccountPolicy();
}

main().catch(console.error);
