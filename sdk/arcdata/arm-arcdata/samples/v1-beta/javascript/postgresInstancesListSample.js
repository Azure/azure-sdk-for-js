// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list postgres Instance resources in the subscription
 *
 * @summary list postgres Instance resources in the subscription
 * x-ms-original-file: 2026-03-01-preview/ListSubscriptionPostgresInstance.json
 */
async function getsAllPostgresInstanceInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.postgresInstances.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAllPostgresInstanceInASubscription();
}

main().catch(console.error);
