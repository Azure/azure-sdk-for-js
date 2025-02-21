// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { NetworkInterfaceTapConfigurationsGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the specified tap configuration on a network interface.
 *
 * @summary Get the specified tap configuration on a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceTapConfigurationGet.json
 */
async function getNetworkInterfaceTapConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const networkInterfaceName = "mynic";
  const tapConfigurationName = "tapconfiguration1";
  const options: NetworkInterfaceTapConfigurationsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations/{tapConfigurationName}",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
      tapConfigurationName,
    )
    .get(options);
  console.log(result);
}

getNetworkInterfaceTapConfigurations().catch(console.error);
