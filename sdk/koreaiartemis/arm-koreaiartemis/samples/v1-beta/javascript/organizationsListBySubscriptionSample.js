// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Organizations in a Subscription.
 *
 * @summary list Organizations in a Subscription.
 * x-ms-original-file: 2026-07-01-preview/Organizations_ListBySubscription.json
 */
async function organizationsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Organizations in a Subscription.
 *
 * @summary list Organizations in a Subscription.
 * x-ms-original-file: 2026-07-01-preview/Organizations_ListBySubscription_MaximumSet_Gen.json
 */
async function organizationsListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationsListBySubscription();
  await organizationsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
