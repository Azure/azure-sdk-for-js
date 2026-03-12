// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all network security groups applied to a network interface.
 *
 * @summary Gets all network security groups applied to a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkInterfaceEffectiveNSGList.json
 */

import type { NetworkInterfacesListEffectiveNetworkSecurityGroupsParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listNetworkInterfaceEffectiveNetworkSecurityGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkInterfaceName = "nic1";
  const options: NetworkInterfacesListEffectiveNetworkSecurityGroupsParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/effectiveNetworkSecurityGroups",
      subscriptionId,
      resourceGroupName,
      networkInterfaceName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

listNetworkInterfaceEffectiveNetworkSecurityGroups().catch(console.error);
