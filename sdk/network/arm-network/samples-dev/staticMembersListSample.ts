// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the specified static member.
 *
 * @summary lists the specified static member.
 * x-ms-original-file: 2025-05-01/NetworkManagerStaticMemberList.json
 */
async function staticMembersList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticMembers.list(
    "rg1",
    "testNetworkManager",
    "testNetworkGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await staticMembersList();
}

main().catch(console.error);
