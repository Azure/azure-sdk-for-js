// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualRouterPeeringsCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates the specified Virtual Router Peering.
 *
 * @summary Creates or updates the specified Virtual Router Peering.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualRouterPeeringPut.json
 */
async function createVirtualRouterPeering() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualRouterName = "virtualRouter";
  const peeringName = "peering1";
  const options: VirtualRouterPeeringsCreateOrUpdateParameters = {
    body: { properties: { peerAsn: 20000, peerIp: "192.168.1.5" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualRouters/{virtualRouterName}/peerings/{peeringName}",
      subscriptionId,
      resourceGroupName,
      virtualRouterName,
      peeringName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualRouterPeering().catch(console.error);
