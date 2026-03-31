// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of Static CIDR resources at Network Manager level.
 *
 * @summary gets list of Static CIDR resources at Network Manager level.
 * x-ms-original-file: 2025-05-01/StaticCidrs_List.json
 */
async function staticCidrsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticCidrs.list("rg1", "TestNetworkManager", "TestPool")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await staticCidrsList();
}

main().catch(console.error);
