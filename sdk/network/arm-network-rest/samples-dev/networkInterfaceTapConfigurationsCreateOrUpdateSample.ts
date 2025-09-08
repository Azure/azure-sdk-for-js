// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a Tap configuration in the specified NetworkInterface.
 *
 * @summary Creates or updates a Tap configuration in the specified NetworkInterface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceTapConfigurationCreate.json
 */

import type { NetworkInterfaceTapConfigurationsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createNetworkInterfaceTapConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const networkInterfaceName = "mynic";
  const tapConfigurationName = "tapconfiguration1";
  const options: NetworkInterfaceTapConfigurationsCreateOrUpdateParameters = {
    body: {
      properties: {
        virtualNetworkTap: {
          id: "/subscriptions/subid/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworkTaps/testvtap",
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations/{tapConfigurationName}",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
      tapConfigurationName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createNetworkInterfaceTapConfigurations().catch(console.error);
