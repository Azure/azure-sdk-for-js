// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ExpressRouteCircuitPeeringsCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a peering in the specified express route circuits.
 *
 * @summary Creates or updates a peering in the specified express route circuits.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteCircuitPeeringCreate.json
 */
async function createExpressRouteCircuitPeerings() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const circuitName = "circuitName";
  const peeringName = "AzurePrivatePeering";
  const options: ExpressRouteCircuitPeeringsCreateOrUpdateParameters = {
    body: {
      properties: {
        peerASN: 200,
        primaryPeerAddressPrefix: "192.168.16.252/30",
        secondaryPeerAddressPrefix: "192.168.18.252/30",
        vlanId: 200,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}",
      subscriptionId,
      resourceGroupName,
      circuitName,
      peeringName,
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createExpressRouteCircuitPeerings().catch(console.error);
