// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ExpressRouteCircuitPeeringsGetParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the specified peering for the express route circuit.
 *
 * @summary Gets the specified peering for the express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteCircuitPeeringGet.json
 */
async function getExpressRouteCircuitPeering() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const circuitName = "circuitName";
  const peeringName = "MicrosoftPeering";
  const options: ExpressRouteCircuitPeeringsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}",
      subscriptionId,
      resourceGroupName,
      circuitName,
      peeringName
    )
    .get(options);
  console.log(result);
}

getExpressRouteCircuitPeering().catch(console.error);
