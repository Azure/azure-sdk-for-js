// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group.
 *
 * @summary Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayBackendHealthTest.json
 */
async function testBackendHealth() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const applicationGatewayName = "appgw";
  const probeRequest = {
    path: "/",
    backendAddressPool: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/backendaddressPools/MFAnalyticsPool",
    },
    backendHttpSettings: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/backendHttpSettingsCollection/MFPoolSettings",
    },
    pickHostNameFromBackendHttpSettings: true,
    timeout: 30,
    protocol: "Http",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.beginBackendHealthOnDemandAndWait(
    resourceGroupName,
    applicationGatewayName,
    probeRequest,
  );
  console.log(result);
}

async function main() {
  await testBackendHealth();
}

main().catch(console.error);
