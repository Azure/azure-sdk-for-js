// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all peerings in a specified ExpressRouteCrossConnection.
 *
 * @summary gets all peerings in a specified ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionBgpPeeringList.json
 */
async function expressRouteCrossConnectionBgpPeeringList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteCrossConnectionPeerings.list(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await expressRouteCrossConnectionBgpPeeringList();
}

main().catch(console.error);
