// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the DNS zones in all resource groups in a subscription.
 *
 * @summary lists the DNS zones in all resource groups in a subscription.
 * x-ms-original-file: 2023-07-01-preview/ListZonesBySubscription.json
 */
async function listZonesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.zones.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listZonesBySubscription();
}

main().catch(console.error);
