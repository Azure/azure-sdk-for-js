// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves all the ExpressRouteCrossConnections in a subscription.
 *
 * @summary retrieves all the ExpressRouteCrossConnections in a subscription.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionList.json
 */
async function expressRouteCrossConnectionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteCrossConnections.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await expressRouteCrossConnectionList();
}

main().catch(console.error);
