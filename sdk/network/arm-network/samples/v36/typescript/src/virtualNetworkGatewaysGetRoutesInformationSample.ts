// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualNetworkGatewaysGetRoutesInformationOptionalParams} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This operation retrieves the route set information for an Express Route Gateway based on their resiliency
 *
 * @summary This operation retrieves the route set information for an Express Route Gateway based on their resiliency
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayGetRoutesInformation.json
 */
async function getVirtualNetworkGatewayRoutesInformation(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const attemptRefresh = false;
  const options: VirtualNetworkGatewaysGetRoutesInformationOptionalParams = {
    attemptRefresh,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGetRoutesInformationAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      options,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayRoutesInformation();
}

main().catch(console.error);
