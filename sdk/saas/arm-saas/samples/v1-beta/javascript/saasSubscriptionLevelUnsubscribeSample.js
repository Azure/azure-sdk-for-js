// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unsubscribes from a SaaS subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled.
 *
 * @summary unsubscribes from a SaaS subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled.
 * x-ms-original-file: 2026-04-01/SaasUnsubscribe.json
 */
async function unsubscribeFromASaaSSubscriptionLevelResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.unsubscribe(
    "myResourceGroup",
    "mySaasResource",
    {
      unsubscribeOnly: true,
      reasonCode: 4,
      feedback: "No longer needed",
      deletionSource: "CustomerCancellation",
    },
  );
  console.log(result);
}

async function main() {
  await unsubscribeFromASaaSSubscriptionLevelResource();
}

main().catch(console.error);
