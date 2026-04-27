// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists private link resources in a HorizonDb cluster.
 *
 * @summary lists private link resources in a HorizonDb cluster.
 * x-ms-original-file: 2026-01-20-preview/PrivateLinkResources_List.json
 */
async function getsPrivateLinkResourcesForHorizonDb(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbPrivateLinkResources.list(
    "exampleresourcegroup",
    "examplecluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsPrivateLinkResourcesForHorizonDb();
}

main().catch(console.error);
