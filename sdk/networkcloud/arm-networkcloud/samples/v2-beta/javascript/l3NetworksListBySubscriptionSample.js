// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of layer 3 (L3) networks in the provided subscription.
 *
 * @summary get a list of layer 3 (L3) networks in the provided subscription.
 * x-ms-original-file: 2026-05-01-preview/L3Networks_ListBySubscription.json
 */
async function listL3NetworksForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.l3Networks.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listL3NetworksForSubscription();
}

main().catch(console.error);
