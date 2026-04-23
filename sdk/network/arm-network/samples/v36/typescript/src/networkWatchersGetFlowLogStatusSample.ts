// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FlowLogStatusParameters} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Queries status of flow log and traffic analytics (optional) on a specified resource.
 *
 * @summary Queries status of flow log and traffic analytics (optional) on a specified resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherFlowLogStatusQuery.json
 */
async function getFlowLogStatus(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const parameters: FlowLogStatusParameters = {
    targetResourceId:
      "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/nsg1",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.beginGetFlowLogStatusAndWait(
    resourceGroupName,
    networkWatcherName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFlowLogStatus();
}

main().catch(console.error);
