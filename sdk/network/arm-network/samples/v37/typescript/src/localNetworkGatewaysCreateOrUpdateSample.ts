// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a local network gateway in the specified resource group.
 *
 * @summary creates or updates a local network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/LocalNetworkGatewayCreate.json
 */
async function createLocalNetworkGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.localNetworkGateways.createOrUpdate("rg1", "localgw", {
    location: "Central US",
    fqdn: "site1.contoso.com",
    gatewayIpAddress: "11.12.13.14",
    localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createLocalNetworkGateway();
}

main().catch(console.error);
