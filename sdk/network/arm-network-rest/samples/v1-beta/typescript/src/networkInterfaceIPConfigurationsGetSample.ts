// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkInterfaceIPConfigurationsGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified network interface ip configuration.
 *
 * @summary Gets the specified network interface ip configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceIPConfigurationGet.json
 */
async function networkInterfaceIPConfigurationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const networkInterfaceName = "mynic";
  const ipConfigurationName = "ipconfig1";
  const options: NetworkInterfaceIPConfigurationsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/ipConfigurations/{ipConfigurationName}",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
      ipConfigurationName,
    )
    .get(options);
  console.log(result);
}

networkInterfaceIPConfigurationGet().catch(console.error);
