// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the Private DNS zones in all resource groups in a subscription.
 *
 * @summary lists the Private DNS zones in all resource groups in a subscription.
 * x-ms-original-file: 2024-06-01/PrivateZoneListInSubscription.json
 */
async function getPrivateDNSZoneBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateZones.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getPrivateDNSZoneBySubscription();
}

main().catch(console.error);
