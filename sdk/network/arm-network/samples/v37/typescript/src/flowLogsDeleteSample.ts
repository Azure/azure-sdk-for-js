// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified flow log resource.
 *
 * @summary deletes the specified flow log resource.
 * x-ms-original-file: 2025-05-01/NetworkWatcherFlowLogDelete.json
 */
async function deleteFlowLog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.flowLogs.delete("rg1", "nw1", "fl");
}

async function main(): Promise<void> {
  await deleteFlowLog();
}

main().catch(console.error);
