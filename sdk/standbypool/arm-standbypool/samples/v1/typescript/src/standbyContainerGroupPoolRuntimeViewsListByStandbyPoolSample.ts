// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource
 *
 * @summary list StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource
 * x-ms-original-file: 2024-03-01/StandbyContainerGroupPoolRuntimeViews_ListByStandbyPool.json
 */
async function standbyContainerGroupPoolRuntimeViewsListByStandbyPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.standbyContainerGroupPoolRuntimeViews.listByStandbyPool(
    "rgstandbypool",
    "pool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  standbyContainerGroupPoolRuntimeViewsListByStandbyPool();
}

main().catch(console.error);
