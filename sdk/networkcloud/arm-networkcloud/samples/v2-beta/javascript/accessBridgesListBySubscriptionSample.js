// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of access bridges in the provided subscription.
 *
 * @summary get a list of access bridges in the provided subscription.
 * x-ms-original-file: 2026-05-01-preview/AccessBridges_ListBySubscription.json
 */
async function listAccessBridgesForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessBridges.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAccessBridgesForSubscription();
}

main().catch(console.error);
