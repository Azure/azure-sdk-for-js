// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the specified interconnect group.
 *
 * @summary gets information about the specified interconnect group.
 * x-ms-original-file: 2025-07-01/InterconnectGroupGet.json
 */
async function getInterconnectGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.interconnectGroups.get("rg1", "test-ig");
  console.log(result);
}

async function main(): Promise<void> {
  await getInterconnectGroup();
}

main().catch(console.error);
