// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves the details of all the failover tests performed on the gateway for different peering locations
 *
 * @summary this operation retrieves the details of all the failover tests performed on the gateway for different peering locations
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetFailoverAllTestsDetails.json
 */
async function virtualNetworkGatewayGetFailoverAllTestsDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getFailoverAllTestDetails(
    "rg1",
    "ergw",
    "SingleSiteFailover",
    true,
  );
  console.log(result);
}

async function main() {
  await virtualNetworkGatewayGetFailoverAllTestsDetails();
}

main().catch(console.error);
