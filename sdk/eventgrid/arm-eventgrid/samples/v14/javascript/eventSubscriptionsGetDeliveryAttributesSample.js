/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get all delivery attributes for an event subscription.
 *
 * @summary Get all delivery attributes for an event subscription.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/stable/2025-02-15/examples/EventSubscriptions_GetDeliveryAttributes.json
 */
async function eventSubscriptionsGetDeliveryAttributes() {
  const scope = "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const eventSubscriptionName = "aaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.eventSubscriptions.getDeliveryAttributes(
    scope,
    eventSubscriptionName,
  );
  console.log(result);
}

async function main() {
  await eventSubscriptionsGetDeliveryAttributes();
}

main().catch(console.error);
