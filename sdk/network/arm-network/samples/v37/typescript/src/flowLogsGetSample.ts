// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a flow log resource by name.
 *
 * @summary gets a flow log resource by name.
 * x-ms-original-file: 2025-05-01/NetworkWatcherFlowLogGet.json
 */
async function getFlowLog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.flowLogs.get("rg1", "nw1", "flowLog1");
  console.log(result);
}

async function main(): Promise<void> {
  await getFlowLog();
}

main().catch(console.error);
