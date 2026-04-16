// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or Update Subscription tenant policy for user's tenant.
 *
 * @summary Create or Update Subscription tenant policy for user's tenant.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/changeTenantPolicy.json
 */
async function tenantPolicy() {
  const body = {
    blockSubscriptionsIntoTenant: true,
    blockSubscriptionsLeavingTenant: true,
    exemptedPrincipals: [
      "e879cf0f-2b4d-5431-109a-f72fc9868693",
      "9792da87-c97b-410d-a97d-27021ba09ce6",
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptionPolicy.addUpdatePolicyForTenant(body);
  console.log(result);
}

async function main() {
  await tenantPolicy();
}

main().catch(console.error);
