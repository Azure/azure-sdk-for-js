// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PeerExpressRouteCircuitConnectionsGetParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the specified Peer Express Route Circuit Connection from the specified express route circuit.
 *
 * @summary Gets the specified Peer Express Route Circuit Connection from the specified express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PeerExpressRouteCircuitConnectionGet.json
 */
async function peerExpressRouteCircuitConnectionGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const circuitName = "ExpressRouteARMCircuitA";
  const peeringName = "AzurePrivatePeering";
  const connectionName = "60aee347-e889-4a42-8c1b-0aae8b1e4013";
  const options: PeerExpressRouteCircuitConnectionsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/peerConnections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      circuitName,
      peeringName,
      connectionName
    )
    .get(options);
  console.log(result);
}

peerExpressRouteCircuitConnectionGet().catch(console.error);
