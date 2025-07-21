// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the Private DNS zones in all resource groups in a subscription.
 *
 * @summary lists the Private DNS zones in all resource groups in a subscription.
 * x-ms-original-file: 2024-06-01/PrivateZoneListInSubscription.json
 */
async function getPrivateDNSZoneBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateZones.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getPrivateDNSZoneBySubscription();
}

main().catch(console.error);
