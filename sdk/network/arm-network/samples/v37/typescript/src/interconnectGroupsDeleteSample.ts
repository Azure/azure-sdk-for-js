// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified interconnect group.
 *
 * @summary deletes the specified interconnect group.
 * x-ms-original-file: 2025-07-01/InterconnectGroupDelete.json
 */
async function deleteInterconnectGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.interconnectGroups.delete("rg1", "test-ig");
}

async function main(): Promise<void> {
  await deleteInterconnectGroup();
}

main().catch(console.error);
