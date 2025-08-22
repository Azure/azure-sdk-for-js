// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a HubVirtualNetworkConnection.
 *
 * @summary Deletes a HubVirtualNetworkConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/HubVirtualNetworkConnectionDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function hubVirtualNetworkConnectionDelete(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const connectionName = "connection1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.hubVirtualNetworkConnections.beginDeleteAndWait(
    resourceGroupName,
    virtualHubName,
    connectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hubVirtualNetworkConnectionDelete();
}

main().catch(console.error);
