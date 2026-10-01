// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists service health events in the subscription.
 *
 * @summary lists service health events in the subscription.
 * x-ms-original-file: 2025-05-01/Events_ListBySubscriptionId.json
 */
async function listEventsBySubscriptionId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.events.listBySubscriptionId({
    filter: "service eq 'Virtual Machines' or region eq 'West US'",
    queryStartTime: "5/12/2025",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEventsBySubscriptionId();
}

main().catch(console.error);
