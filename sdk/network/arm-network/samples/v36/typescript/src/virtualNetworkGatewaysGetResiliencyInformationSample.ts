// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualNetworkGatewaysGetResiliencyInformationOptionalParams} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This operation retrieves the resiliency information for an Express Route Gateway, including the gateway's current resiliency score and recommendations to further improve the score
 *
 * @summary This operation retrieves the resiliency information for an Express Route Gateway, including the gateway's current resiliency score and recommendations to further improve the score
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayGetResiliencyInformation.json
 */
async function getVirtualNetworkGatewayResiliencyInformation(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const attemptRefresh = true;
  const options: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams =
    { attemptRefresh };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGetResiliencyInformationAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      options,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayResiliencyInformation();
}

main().catch(console.error);
