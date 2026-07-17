// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists network connections in a subscription.
 *
 * @summary lists network connections in a subscription.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_ListBySubscription.json
 */
async function networkConnectionsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkConnections.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkConnectionsListBySubscription();
}

main().catch(console.error);
