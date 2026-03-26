// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the details of a Virtual Hub Ip configuration.
 *
 * @summary retrieves the details of a Virtual Hub Ip configuration.
 * x-ms-original-file: 2025-05-01/VirtualHubIpConfigurationGet.json
 */
async function virtualHubVirtualHubRouteTableV2Get(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubIpConfiguration.get("rg1", "hub1", "ipconfig1");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubVirtualHubRouteTableV2Get();
}

main().catch(console.error);
