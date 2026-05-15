// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network group.
 *
 * @summary gets the specified network group.
 * x-ms-original-file: 2025-05-01/NetworkManagerGroupGet.json
 */
async function networkGroupsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkGroups.get("rg1", "testNetworkManager", "testNetworkGroup");
  console.log(result);
}

async function main(): Promise<void> {
  await networkGroupsGet();
}

main().catch(console.error);
