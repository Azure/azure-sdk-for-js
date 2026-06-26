// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the available namespaces within the subscription regardless of the resourceGroups.
 *
 * @summary lists all the available namespaces within the subscription regardless of the resourceGroups.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceListBySubscription.json
 */
async function relayNameSpaceListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await relayNameSpaceListBySubscription();
}

main().catch(console.error);
