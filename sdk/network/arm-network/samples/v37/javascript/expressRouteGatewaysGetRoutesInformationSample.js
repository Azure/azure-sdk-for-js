// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the route sets information for the ExpressRoute gateway.
 *
 * @summary retrieves the route sets information for the ExpressRoute gateway.
 * x-ms-original-file: 2025-07-01/ExpressRouteGatewayGetRoutesInformation.json
 */
async function expressRouteGatewayGetRoutesInformation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.getRoutesInformation("rg1", "ergw1", {
    attemptRefresh: false,
  });
  console.log(result);
}

async function main() {
  await expressRouteGatewayGetRoutesInformation();
}

main().catch(console.error);
