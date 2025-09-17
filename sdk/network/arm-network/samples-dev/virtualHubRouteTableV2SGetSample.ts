// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves the details of a VirtualHubRouteTableV2.
 *
 * @summary Retrieves the details of a VirtualHubRouteTableV2.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualHubRouteTableV2Get.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualHubVirtualHubRouteTableV2Get(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const routeTableName = "virtualHubRouteTable1a";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubRouteTableV2S.get(
    resourceGroupName,
    virtualHubName,
    routeTableName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubVirtualHubRouteTableV2Get();
}

main().catch(console.error);
