// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all instance pools in the subscription.
 *
 * @summary gets a list of all instance pools in the subscription.
 * x-ms-original-file: 2025-02-01-preview/ListInstancePoolsBySubscriptionId.json
 */
async function listInstancePoolsInTheSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instancePools.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listInstancePoolsInTheSubscription();
}

main().catch(console.error);
