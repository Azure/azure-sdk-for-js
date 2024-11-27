// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VpnServerConfigurationsAssociatedWithVirtualWanListParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group.
 *
 * @summary Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/GetVirtualWanVpnServerConfigurations.json
 */
async function getVirtualWanVpnServerConfigurations() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualWANName = "wan1";
  const options: VpnServerConfigurationsAssociatedWithVirtualWanListParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/vpnServerConfigurations",
      subscriptionId,
      resourceGroupName,
      virtualWANName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

getVirtualWanVpnServerConfigurations().catch(console.error);
