// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the details of all the failover tests performed on the ExpressRoute gateway for different peering locations.
 *
 * @summary retrieves the details of all the failover tests performed on the ExpressRoute gateway for different peering locations.
 * x-ms-original-file: 2025-07-01/ExpressRouteGatewayGetFailoverAllTestsDetails.json
 */
async function expressRouteGatewayGetFailoverAllTestsDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.getFailoverAllTestsDetails("rg1", "ergw1", {
    typeParam: "SingleSiteFailover",
    fetchLatest: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteGatewayGetFailoverAllTestsDetails();
}

main().catch(console.error);
