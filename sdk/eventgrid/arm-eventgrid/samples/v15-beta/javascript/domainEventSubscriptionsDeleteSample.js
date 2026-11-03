// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing event subscription for a domain.
 *
 * @summary delete an existing event subscription for a domain.
 * x-ms-original-file: 2025-07-15-preview/DomainEventSubscriptions_Delete.json
 */
async function domainEventSubscriptionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.domainEventSubscriptions.delete(
    "examplerg",
    "exampleDomain1",
    "examplesubscription1",
  );
}

async function main() {
  await domainEventSubscriptionsDelete();
}

main().catch(console.error);
