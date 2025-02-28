// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ApplicationGatewaysBackendHealthOnDemandParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group.
 *
 * @summary Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationGatewayBackendHealthTest.json
 */
async function testBackendHealth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const applicationGatewayName = "appgw";
  const options: ApplicationGatewaysBackendHealthOnDemandParameters = {
    body: {
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
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/getBackendHealthOnDemand",
      subscriptionId,
      resourceGroupName,
      applicationGatewayName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

testBackendHealth().catch(console.error);
