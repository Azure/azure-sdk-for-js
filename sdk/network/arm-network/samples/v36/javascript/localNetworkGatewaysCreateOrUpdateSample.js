// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a local network gateway in the specified resource group.
 *
 * @summary Creates or updates a local network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LocalNetworkGatewayCreate.json
 */
async function createLocalNetworkGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const localNetworkGatewayName = "localgw";
  const parameters = {
    fqdn: "site1.contoso.com",
    gatewayIpAddress: "11.12.13.14",
    localNetworkAddressSpace: { addressPrefixes: ["10.1.0.0/16"] },
    location: "Central US",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.localNetworkGateways.beginCreateOrUpdateAndWait(
    resourceGroupName,
    localNetworkGatewayName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createLocalNetworkGateway();
}

main().catch(console.error);
