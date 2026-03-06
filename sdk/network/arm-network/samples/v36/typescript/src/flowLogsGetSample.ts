// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a flow log resource by name.
 *
 * @summary Gets a flow log resource by name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherFlowLogGet.json
 */
async function getFlowLog(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const flowLogName = "flowLog1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.flowLogs.get(
    resourceGroupName,
    networkWatcherName,
    flowLogName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFlowLog();
}

main().catch(console.error);
