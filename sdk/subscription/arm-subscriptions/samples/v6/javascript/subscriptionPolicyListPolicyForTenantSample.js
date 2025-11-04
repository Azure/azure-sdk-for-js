// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the subscription tenant policy for the user's tenant.
 *
 * @summary Get the subscription tenant policy for the user's tenant.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getTenantPolicyList.json
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
