// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified static member.
 *
 * @summary gets the specified static member.
 * x-ms-original-file: 2025-05-01/NetworkManagerStaticMemberGet.json
 */
async function staticMembersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.staticMembers.get(
    "rg1",
    "testNetworkManager",
    "testNetworkGroup",
    "testStaticMember",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await staticMembersGet();
}

main().catch(console.error);
