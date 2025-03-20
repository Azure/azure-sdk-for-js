// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ListActiveConnectivityConfigurationsParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists active connectivity configurations in a network manager.
 *
 * @summary Lists active connectivity configurations in a network manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerActiveConnectivityConfigurationsList.json
 */
async function listActiveConnectivityConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const networkManagerName = "testNetworkManager";
  const options: ListActiveConnectivityConfigurationsParameters = {
    body: { regions: ["westus"], skipToken: "fakeSkipTokenCode" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/listActiveConnectivityConfigurations",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
    )
    .post(options);
  console.log(result);
}

listActiveConnectivityConfigurations().catch(console.error);
