// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all of the available subnet delegations for this subscription in this region.
 *
 * @summary gets all of the available subnet delegations for this subscription in this region.
 * x-ms-original-file: 2025-05-01/AvailableDelegationsSubscriptionGet.json
 */
async function getAvailableDelegations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableDelegations.list("westcentralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAvailableDelegations();
}

main().catch(console.error);
