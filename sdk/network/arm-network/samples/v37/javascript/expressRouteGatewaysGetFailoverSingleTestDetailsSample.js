// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a particular failover test performed on the ExpressRoute gateway based on the test Guid.
 *
 * @summary retrieves the details of a particular failover test performed on the ExpressRoute gateway based on the test Guid.
 * x-ms-original-file: 2025-07-01/ExpressRouteGatewayGetFailoverSingleTestDetails.json
 */
async function expressRouteGatewayGetFailoverSingleTestDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.getFailoverSingleTestDetails(
    "rg1",
    "ergw1",
    "Vancouver",
    "00000000-0000-0000-0000-000000000001",
  );
  console.log(result);
}

async function main() {
  await expressRouteGatewayGetFailoverSingleTestDetails();
}

main().catch(console.error);
