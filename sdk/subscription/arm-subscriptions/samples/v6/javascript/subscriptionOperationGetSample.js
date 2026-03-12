// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the status of the pending Microsoft.Subscription API operations.
 *
 * @summary Get the status of the pending Microsoft.Subscription API operations.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getSubscriptionOperation.json
 */
async function getPendingSubscriptionOperations() {
  const operationId = "e4b8d068-f574-462a-a76f-6fa0afc613c9";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptionOperation.get(operationId);
  console.log(result);
}

async function main() {
  await getPendingSubscriptionOperations();
}

main().catch(console.error);
