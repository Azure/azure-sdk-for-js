// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { NetworkInterfaceTapConfigurationsListParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get all Tap configurations in a network interface.
 *
 * @summary Get all Tap configurations in a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceTapConfigurationList.json
 */
async function listVirtualNetworkTapConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkInterfaceName = "mynic";
  const options: NetworkInterfaceTapConfigurationsListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listVirtualNetworkTapConfigurations().catch(console.error);
