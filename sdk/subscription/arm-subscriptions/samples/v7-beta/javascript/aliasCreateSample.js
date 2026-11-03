// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Alias Subscription.
 *
 * @summary create Alias Subscription.
 * x-ms-original-file: 2025-11-01-preview/createAlias.json
 */
async function createAlias() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.alias.create("dummyalias", {
    properties: {
      additionalProperties: {
        subscriptionOwnerId: "f09b39eb-c496-482c-9ab9-afd799572f4c",
        subscriptionTenantId: "66f6e4d6-07dc-4aea-94ea-e12d3026a3c8",
        tags: { tag1: "Messi", tag2: "Ronaldo", tag3: "Lebron" },
      },
      billingScope:
        "/billingAccounts/af6231a7-7f8d-4fcc-a993-dd8466108d07:c663dac6-a9a5-405a-8938-cd903e12ab5b_2019_05_31/billingProfiles/QWDQ-QWHI-AUW-SJDO-DJH/invoiceSections/FEUF-EUHE-ISJ-SKDW-DJH",
      displayName: "Test Subscription",
      workload: "Production",
    },
  });
  console.log(result);
}

async function main() {
  await createAlias();
}

main().catch(console.error);
