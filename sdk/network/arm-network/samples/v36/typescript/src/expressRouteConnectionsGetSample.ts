// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified ExpressRouteConnection.
 *
 * @summary Gets the specified ExpressRouteConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteConnectionGet.json
 */
async function expressRouteConnectionGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "resourceGroupName";
  const expressRouteGatewayName = "expressRouteGatewayName";
  const connectionName = "connectionName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteConnections.get(
    resourceGroupName,
    expressRouteGatewayName,
    connectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteConnectionGet();
}

main().catch(console.error);
