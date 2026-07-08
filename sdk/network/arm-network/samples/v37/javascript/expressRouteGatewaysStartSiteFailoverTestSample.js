// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts failover simulation on the ExpressRoute gateway for the specified peering location.
 *
 * @summary starts failover simulation on the ExpressRoute gateway for the specified peering location.
 * x-ms-original-file: 2025-07-01/ExpressRouteGatewayStartSiteFailoverTest.json
 */
async function expressRouteGatewayStartSiteFailoverTest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.startSiteFailoverTest(
    "rg1",
    "ergw1",
    "Vancouver",
  );
  console.log(result);
}

async function main() {
  await expressRouteGatewayStartSiteFailoverTest();
}

main().catch(console.error);
