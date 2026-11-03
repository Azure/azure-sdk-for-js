// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of an event subscription of a domain.
 *
 * @summary get properties of an event subscription of a domain.
 * x-ms-original-file: 2025-07-15-preview/DomainEventSubscriptions_Get.json
 */
async function domainEventSubscriptionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainEventSubscriptions.get(
    "examplerg",
    "exampleDomain1",
    "examplesubscription1",
  );
  console.log(result);
}

async function main() {
  await domainEventSubscriptionsGet();
}

main().catch(console.error);
