// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the subscription tenant policy for the user's tenant.
 *
 * @summary get the subscription tenant policy for the user's tenant.
 * x-ms-original-file: 2025-11-01-preview/getTenantPolicyList.json
 */
async function getTenantPolicyList() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptionPolicy.listPolicyForTenant()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTenantPolicyList();
}

main().catch(console.error);
