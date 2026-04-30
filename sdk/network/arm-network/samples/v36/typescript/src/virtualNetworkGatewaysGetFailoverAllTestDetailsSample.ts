// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This operation retrieves the details of all the failover tests performed on the gateway for different peering locations
 *
 * @summary This operation retrieves the details of all the failover tests performed on the gateway for different peering locations
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayGetFailoverAllTestsDetails.json
 */
async function virtualNetworkGatewayGetFailoverAllTestsDetails(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "ergw";
  const typeParam = "SingleSiteFailover";
  const fetchLatest = true;
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGetFailoverAllTestDetailsAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      typeParam,
      fetchLatest,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayGetFailoverAllTestsDetails();
}

main().catch(console.error);
