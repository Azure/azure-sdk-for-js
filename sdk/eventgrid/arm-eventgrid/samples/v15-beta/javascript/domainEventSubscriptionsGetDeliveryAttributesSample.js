// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all delivery attributes for an event subscription for domain.
 *
 * @summary get all delivery attributes for an event subscription for domain.
 * x-ms-original-file: 2025-07-15-preview/DomainEventSubscriptions_GetDeliveryAttributes.json
 */
async function domainEventSubscriptionsGetDeliveryAttributes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainEventSubscriptions.getDeliveryAttributes(
    "examplerg",
    "exampleDomain1",
    "examplesubscription1",
  );
  console.log(result);
}

async function main() {
  await domainEventSubscriptionsGetDeliveryAttributes();
}

main().catch(console.error);
