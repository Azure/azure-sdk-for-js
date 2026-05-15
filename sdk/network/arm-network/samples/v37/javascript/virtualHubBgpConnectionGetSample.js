// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a Virtual Hub Bgp Connection.
 *
 * @summary retrieves the details of a Virtual Hub Bgp Connection.
 * x-ms-original-file: 2025-05-01/VirtualHubBgpConnectionGet.json
 */
async function virtualHubVirtualHubRouteTableV2Get() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubBgpConnection.get("rg1", "hub1", "conn1");
  console.log(result);
}

async function main() {
  await virtualHubVirtualHubRouteTableV2Get();
}

main().catch(console.error);
