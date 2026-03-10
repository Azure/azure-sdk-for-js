// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api gets information about all ispCustomer resources under the given subscription
 *
 * @summary this api gets information about all ispCustomer resources under the given subscription
 * x-ms-original-file: 2024-11-30-preview/IspCustomers_ListBySubscription_MaximumSet_Gen.json
 */
async function ispCustomerListBySubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ispCustomers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await ispCustomerListBySubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
