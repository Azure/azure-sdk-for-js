// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the details of a Virtual Hub Bgp Connection.
 *
 * @summary retrieves the details of a Virtual Hub Bgp Connection.
 * x-ms-original-file: 2025-05-01/VirtualHubBgpConnectionGet.json
 */
async function virtualHubVirtualHubRouteTableV2Get(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubBgpConnection.get("rg1", "hub1", "conn1");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubVirtualHubRouteTableV2Get();
}

main().catch(console.error);
