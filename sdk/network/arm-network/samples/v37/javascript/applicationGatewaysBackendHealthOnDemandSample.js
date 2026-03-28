// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group.
 *
 * @summary gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayBackendHealthTest.json
 */
async function testBackendHealth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.backendHealthOnDemand("rg1", "appgw", {
    path: "/",
    backendAddressPool: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/backendaddressPools/MFAnalyticsPool",
    },
    backendHttpSettings: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/backendHttpSettingsCollection/MFPoolSettings",
    },
    pickHostNameFromBackendHttpSettings: true,
    timeout: 30,
    protocol: "Http",
  });
  console.log(result);
}

async function main() {
  await testBackendHealth();
}

main().catch(console.error);
