// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources.
 *
 * @summary deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources.
 * x-ms-original-file: 2025-05-01/ExpressRouteGatewayDelete.json
 */
async function expressRouteGatewayDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteGateways.delete("resourceGroupName", "expressRouteGatewayName");
}

async function main(): Promise<void> {
  await expressRouteGatewayDelete();
}

main().catch(console.error);
