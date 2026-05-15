// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the details of a ExpressRoute gateway in a resource group.
 *
 * @summary fetches the details of a ExpressRoute gateway in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteGatewayGet.json
 */
async function expressRouteGatewayGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.get(
    "resourceGroupName",
    "expressRouteGatewayName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteGatewayGet();
}

main().catch(console.error);
